import getUniqueId from 'binary-utils/lib/getUniqueId';
import LiveEvents from './LiveEvents';
import ServerError from './ServerError';
import * as calls from './calls';
import * as stateful from './stateful';
import * as customCalls from './custom';

getUniqueId(); // skip 0 value
const defaultApiUrl = 'wss://ws.binaryws.com/websockets/v3';
const MockWebSocket = () => {};
let WebSocket = typeof window !== 'undefined' ? window.WebSocket : MockWebSocket;

const shouldIgnoreError = error =>
    error.message.includes('You are already subscribed to') ||
        error.message.includes('Input validation failed: forget');
const shouldNotThrow = json => 
    json.error.code === 'SelfExclusion' && json.msg_type === 'authorize';

export default class LiveApi {

    static Status = {
        Unknown: 'unknown',
        Connected: 'connected',
    };

    constructor({ apiUrl = defaultApiUrl, language = 'en', appId = 0, websocket, connection, keepAlive } = {}) {
        this.apiUrl = apiUrl;
        this.language = language;
        this.appId = appId;
        if (keepAlive) {
            setInterval(() => this.ping(), 60 * 1000);
        }

        if (websocket) {
            WebSocket = websocket;
        }

        this.status = LiveApi.Status.Unknown;

        this.bufferedSends = [];
        this.bufferedExecutes = [];
        this.unresolvedPromises = {};

        this.events = new LiveEvents();

        this.bindCallsAndStateMutators();

        this.connect(connection);
    }

    bindCallsAndStateMutators() {
        Object.keys(calls).forEach(callName => {
            this[callName] = (...params) => {
                if (stateful[callName]) {
                    stateful[callName](...params);
                }
                return this.send(calls[callName](...params));
            };
        });

        Object.keys(customCalls).forEach(callName => {
            this[callName] = (...params) =>
                customCalls[callName](this, ...params);      // seems to be a good place to do some simple cache
        });
    }

    connect(connection) {
        const urlPlusParams = `${this.apiUrl}?l=${this.language}&app_id=${this.appId}`;

        try {
            this.socket = connection || new WebSocket(urlPlusParams);
        } catch (err) {
            // swallow connection error, we can't do anything about it
        } finally {
            this.socket.onopen = this.onOpen;
            this.socket.onclose = this.connect;
            this.socket.onmessage = this.onMessage;
        }
    }

    onOpen = () => {
        this.resubscribe();
        this.sendBufferedSends();
        this.executeBufferedExecutes();
    }
    disconnect = () => {
        this.token = '';
        this.socket.onclose = undefined;
        this.socket.close();
    }

    resubscribe = () => {
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

            this.onAuth = undefined;
        };

        if (token) {
            this.authorize(token);
        }

        ticks.forEach(tick =>
            this.subscribeToTick(tick)
        );

        proposals.forEach(proposal =>
            this.subscribeToPriceForContractProposal(proposal)
        );
    }

    changeLanguage = ln => {
        if (ln === this.language) {
            return;
        }
        this.socket.onclose = undefined;
        this.socket.close();
        this.language = ln;
        this.connect();
    }

    isReady = () =>
        this.socket && this.socket.readyState === 1;

    sendBufferedSends = () => {
        while (this.bufferedSends.length > 0) {
            this.socket.send(JSON.stringify(this.bufferedSends.shift()));
        }
    }

    executeBufferedExecutes = () => {
        while (this.bufferedExecutes.length > 0) {
            this.bufferedExecutes.shift()();
        }
    }

    resolvePromiseForResponse = json => {
        if (typeof json.req_id === 'undefined') {
            return Promise.resolve();
        }

        const reqId = json.req_id.toString();
        const promise = this.unresolvedPromises[reqId];

        if (!promise) {
            return Promise.resolve();
        }

        delete this.unresolvedPromises[reqId];
        if (!json.error || shouldNotThrow(json)) {
            return promise.resolve(json);
        }

        if (!shouldIgnoreError(json.error)) {
            return promise.reject(new ServerError(json));
        }

        return Promise.resolve();
    }

    onMessage = message => {
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

    generatePromiseForRequest = json => {
        const reqId = json.req_id.toString();

        return new Promise((resolve, reject) => {
            this.unresolvedPromises[reqId] = { resolve, reject };
        });
    }

    sendRaw = json => {
        if (this.isReady()) {
            this.socket.send(JSON.stringify(json));
        } else {
            this.bufferedSends.push(json);
        }

        if (typeof json.req_id !== 'undefined') {
            return this.generatePromiseForRequest(json);
        }

        return undefined;
    }

    send = json => {
        const reqId = getUniqueId();
        return this.sendRaw({
            req_id: reqId,
            ...json,
        });
    }

    execute = func => {
        if (this.isReady()) {
            func();
        } else {
            this.bufferedExecutes.push(func);
        }
    }
}
