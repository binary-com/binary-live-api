import getUniqueId from 'binary-utils/lib/getUniqueId';
import LiveEvents from './LiveEvents';
import LiveError from './LiveError';
import * as calls from './calls';
import * as stateful from './stateful';
import * as customCalls from './custom';

const defaultApiUrl = 'wss://ws.binaryws.com/websockets/v3';
const MockWebSocket = () => {};
let WebSocket = typeof window !== 'undefined' ? window.WebSocket : MockWebSocket;

const shouldIgnoreError = error =>
    error.message.includes('You are already subscribed to') ||
        error.message.includes('Input validation failed: forget');

export default class LiveApi {

    static Status = {
        Unknown: 'unknown',
        Connected: 'connected',
    };

    constructor({ apiUrl = defaultApiUrl, language = 'en', appId = 0, websocket, connection } = {}) {
        this.apiUrl = apiUrl;
        this.language = language;
        this.appId = appId;

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

        this.socket = connection || new WebSocket(urlPlusParams);
        this.socket.onopen = ::this.onOpen;
        this.socket.onclose = ::this.onClose;
        this.socket.onerror = ::this.onError;
        this.socket.onmessage = ::this.onMessage;
    }

    disconnect() {
        this.token = '';
        this.socket.onclose = undefined;
        this.socket.close();
    }

    resubscribe() {
        const { token, balance, portfolio, transactions, ticks, proposals } = stateful.getState();

        const delayedCallAfterAuthSuccess = () => {
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
        this.onAuth = delayedCallAfterAuthSuccess;

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

    changeLanguage(ln) {
        if (ln === this.language) {
            return;
        }
        this.socket.onclose = undefined;
        this.socket.close();
        this.language = ln;
        this.connect();
        this.resubscribe();
    }

    isReady() {
        return this.socket && this.socket.readyState === 1;
    }

    sendBufferedSends() {
        while (this.bufferedSends.length > 0) {
            this.socket.send(JSON.stringify(this.bufferedSends.shift()));
        }
    }

    executeBufferedExecutes() {
        while (this.bufferedExecutes.length > 0) {
            this.bufferedExecutes.shift()();
        }
    }

    onOpen() {
        this.sendBufferedSends();
        this.executeBufferedExecutes();
    }

    onClose() {
        this.connect();
        this.resubscribe();
    }

    onError(error) {
        console.error(error); // eslint-disable-line no-console

        // And also make process exiting to respawn.
        if (typeof process === 'function') {
            process.exit();
        }
    }

    resolvePromiseForResponse(json) {
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
            return promise.reject(new LiveError(json.error));
        }

        return Promise.resolve();
    }

    onMessage(message) {
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

    generatePromiseForRequest(json) {
        const reqId = json.req_id.toString();

        return new Promise((resolve, reject) => {
            this.unresolvedPromises[reqId] = { resolve, reject };
        });
    }

    sendRaw(json) {
        if (this.isReady()) {
            this.socket.send(JSON.stringify(json));
        } else {
            this.bufferedSends.push(json);
        }

        if (typeof json.req_id !== 'undefined') {
            return this.generatePromiseForRequest(json);
        }
    }

    send(json) {
        const reqId = getUniqueId();
        return this.sendRaw({
            req_id: reqId,
            ...json,
        });
    }

    execute(func) {
        if (this.isReady()) {
            func();
        } else {
            this.bufferedExecutes.push(func);
        }
    }
}
