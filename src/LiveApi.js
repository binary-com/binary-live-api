import LiveEvents from './LiveEvents';
import LiveSubscriptions from './LiveSubscriptions';
import LiveError from './LiveError';
import * as calls from './calls';

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

    constructor({ apiUrl = 'wss://ws.binaryws.com/websockets/v3', language = 'en', websocket } = {}) {
        this.apiUrl = apiUrl;
        this.language = language;

        if (websocket) {
            WebSocket = websocket;
        }

        this.status = LiveApi.Status.Unknown;

        this.bufferedSends = [];
        this.bufferedExecutes = [];
        this.unresolvedPromises = {};

        this.events = new LiveEvents();
        this.subscriptions = new LiveSubscriptions();

        this.connect();

        Object.keys(calls).forEach(callName => {
            this[callName] = (...params) => this.send(calls[callName](...params));
        });
    }

    connect() {
        this.socket = new WebSocket(`${this.apiUrl}?l=${this.language}`);
        this.socket.onopen = ::this.onOpen;
        this.socket.onclose = ::this.onClose;
        this.socket.onerror = ::this.onError;
        this.socket.onmessage = ::this.onMessage;

        if (this.token) {
            this.authorize(this.token);
        }
    }

    disconnect() {
        this.token = '';
        this.socket.onclose = undefined;
        this.socket.close();
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
        setTimeout(() => {
            this.connect();
            this.resubscribe();
        }, 1000);
    }

    onError(error) {
        // for process manager like pm2.
        // It's necessary to print error with console.error.
        // It will make error readable on error.log
        window.console.error(error);

        // And also make process exiting to respawn.
        if (typeof process === 'function') {
            process.exit();
        }
    }

    resolvePromiseForResponse(json) {
        if (!json.req_id) {
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
            this.events.emit(json.msg_type, json);
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

        if (json.req_id) {
            return this.generatePromiseForRequest(json);
        }
    }

    send(json) {
        const reqId = Math.floor((Math.random() * 1e15));
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

    resubscribe() {
        const { ticks, priceProposal } = this.subscriptions;

        this.subscribeToTicks(Object.keys(ticks));

        if (priceProposal) {
            this.subscribeToPriceForContractProposal(priceProposal);
        }
    }
}
