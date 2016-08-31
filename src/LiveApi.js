import { getUniqueId } from 'binary-utils';
import LiveEvents from './LiveEvents';
import ServerError from './ServerError';
import * as calls from './calls';
import * as stateful from './stateful';
import * as customCalls from './custom';

getUniqueId(); // skip 0 value
const defaultApiUrl = 'wss://ws.binaryws.com/websockets/v3';
const nullFunc = () => {};
const MockWebSocket = nullFunc;
let WebSocket = typeof window !== 'undefined' ? window.WebSocket : MockWebSocket;

const shouldIgnoreError = (error: Error): boolean =>
    error.message.includes('You are already subscribed to') ||
        error.message.includes('Input validation failed: forget');

export default class LiveApi {

    token: string;
    apiUrl: string;
    language: string;
    appId: number;
    socket: WebSocket;
    bufferedSends: Object[];
    bufferedExecutes: (() => void)[];
    unresolvedPromises: Object;
    events: LiveEvents;
    onAuth: () => void;

    constructor(initParams: InitParams) {
        const { apiUrl = defaultApiUrl, language = 'en', appId = 0, websocket, connection, keepAlive } = initParams || {};

        this.apiUrl = apiUrl;
        this.language = language;
        this.appId = appId;

        if (keepAlive) {
            setInterval(() => this.ping(), 60 * 1000);
        }

        if (websocket) {
            WebSocket = websocket;
        }

        this.bufferedSends = [];
        this.bufferedExecutes = [];
        this.unresolvedPromises = {};

        this.events = new LiveEvents();

        this.bindCallsAndStateMutators();

        this.connect(connection);
    }

    bindCallsAndStateMutators(): void {
        Object.keys(calls).forEach(callName => {
                this[callName] =
                    (...params) => this.send(calls[callName](...params), callName);
            }
        );

        Object.keys(customCalls).forEach(callName => {
            this[callName] = (...params) =>
                customCalls[callName](this, ...params);      // seems to be a good place to do some simple cache
        });
    }

    connect(connection: ?WebSocket): void {
        const urlPlusParams = `${this.apiUrl}?l=${this.language}&app_id=${this.appId}`;

        try {
            this.socket = connection || new WebSocket(urlPlusParams);
        } catch (err) {
            // swallow connection error, we can't do anything about it
        } finally {
            this.socket.onopen = this.onOpen;
            this.socket.onclose = () => this.connect();
            this.socket.onmessage = this.onMessage;
        }
    }

    onOpen = (): void => {
        this.resubscribe();
        this.sendBufferedSends();
        this.executeBufferedExecutes();
    }

    disconnect = (): void => {
        this.token = '';
        this.socket.onclose = nullFunc;
        this.socket.close();
    }

    resubscribe = (): void => {
        const { token, balance, portfolio, transactions, ticks, proposals } = stateful.getState();

        this.onAuth = () => {
            if (balance) {
                this.subscribeToBalance();
            }

            if (transactions) {
                this.subscribeToTransactions();
            }

            if (portfolio) {
                this.subscribeToAllOpenContracts();
            }

            this.onAuth = () => {};
        };

        if (token) {
            this.authorize(token);
        }

        if (ticks) {
            this.subscribeToTicks([...ticks]);
        }

        proposals.forEach(proposal =>
            this.subscribeToPriceForContractProposal(proposal)
        );
    }

    changeLanguage = (ln: string): void => {
        if (ln === this.language) {
            return;
        }
        this.socket.onclose = nullFunc;
        this.socket.close();
        this.language = ln;
        this.connect();
    }

    isReady = (): boolean =>
        !!this.socket && this.socket.readyState === 1;

    sendBufferedSends = (): void => {
        while (this.bufferedSends.length > 0) {
            this.socket.send(JSON.stringify(this.bufferedSends.shift()));
        }
    }

    executeBufferedExecutes = (): void => {
        while (this.bufferedExecutes.length > 0) {
            this.bufferedExecutes.shift()();
        }
    }

    resolvePromiseForResponse = (json: Object): LivePromise => {
        if (typeof json.req_id === 'undefined') {
            return Promise.resolve();
        }

        const reqId = json.req_id.toString();
        const promise = this.unresolvedPromises[reqId];

        if (!promise) {
            return Promise.resolve();
        }

        delete this.unresolvedPromises[reqId];
        if (!json.error) {
            return promise.resolve(json);
        }

        if (!shouldIgnoreError(json.error)) {
            return promise.reject(new ServerError(json));
        }

        return Promise.resolve();
    }

    onMessage = (message: MessageEvent): LivePromise => {
        const json = JSON.parse(message.data);

        if (!json.error) {
            if (json.msg_type === 'authorize' && this.onAuth) {
                this.onAuth();
            }
            this.events.emit(json.msg_type, json);
        } else {
            this.events.emit('error', json);
        }

        return this.resolvePromiseForResponse(json);
    }

    generatePromiseForRequest = (json: Object): LivePromise => {
        const reqId = json.req_id.toString();

        return new Promise((resolve, reject) => {
            this.unresolvedPromises[reqId] = { resolve, reject };
        });
    }

    send = (param: Object, callName: string): ?LivePromise => {
        const reqId = getUniqueId();
        const json = {
            req_id: reqId,
            ...param,
        };

        if (this.isReady()) {
            this.socket.send(JSON.stringify(json));
            if (stateful[callName]) {
                stateful[callName](param[Object.keys(param)[0]]);
            }
        } else {
            this.bufferedSends.push(json);
        }

        if (typeof json.req_id !== 'undefined') {
            return this.generatePromiseForRequest(json);
        }

        return undefined;
    }

    execute = (func: () => void): void => {
        if (this.isReady()) {
            func();
        } else {
            this.bufferedExecutes.push(func);
        }
    }
}
