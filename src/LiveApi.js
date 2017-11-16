import { Observable } from 'rx-lite';
import { getUniqueId } from 'binary-utils';
import LiveEvents from './LiveEvents';
import ServerError from './ServerError';
import * as calls from './calls';
import ApiState from './ApiState';
import * as customCalls from './custom';

getUniqueId(); // skip 0 value
const defaultApiUrl = 'wss://frontend.binaryws.com/websockets/v3';
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
    brand: string;
    socket: WebSocket;
    bufferedSends: Object[];
    bufferedExecutes: () => void[];
    unresolvedPromises: Object;
    events: LiveEvents;
    onAuth: () => void;
    apiState: ApiState;

    constructor(initParams: InitParams) {
        const {
            apiUrl = defaultApiUrl,
            language = 'en',
            appId = 0,
            brand = '',
            sendSpy = () => {},
            websocket,
            connection,
            keepAlive,
            useRx = false,
        } = initParams || {};

        this.apiUrl = apiUrl;
        this.language = language;
        this.appId = appId;
        this.brand = brand;
        this.sendSpy = sendSpy;

        // experimental: use at your own risk
        this.useRx = useRx;

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
        this.apiState = new ApiState();

        if (useRx) {
            this.uncompleteOneTimeObs = {};
            this.uncompleteStreamObs = {};
        }

        this.bindCallsAndStateMutators();

        this.connect(connection);
    }

    bindCallsAndStateMutators(): void {
        Object.keys(calls).forEach(callName => {
            this[callName] = (...params) => this.sendAndUpdateState(callName, ...params);
        });

        Object.keys(customCalls).forEach(callName => {
            this[callName] = (...params) => customCalls[callName](this, ...params); // seems to be a good place to do some simple cache
        });
    }

    connect(connection: ?WebSocket): void {
        const optionalParam = this.brand ? `&brand=${this.brand}` : '';
        const urlPlusParams = `${this.apiUrl}?l=${this.language}&app_id=${this.appId}${optionalParam}`;

        Object.keys(this.unresolvedPromises).forEach(reqId => {
            const disconnectedError = new Error('Websocket disconnected before response received.');
            disconnectedError.name = 'DisconnectError';
            this.unresolvedPromises[reqId].reject(disconnectedError);
            delete this.unresolvedPromises[reqId];
        });

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
        this.executeBufferedExecutes();
    };

    disconnect = (): void => {
        this.token = '';
        this.socket.onclose = nullFunc;
        this.socket.close();
    };

    resubscribe = (): void => {
        const {
            token,
            contracts,
            balance,
            allContract,
            candlesHistory,
            transactions,
            ticks,
            ticksHistory,
            proposals,
        } = this.apiState.getState();

        this.onAuth = () => {
            if (balance) {
                this.subscribeToBalance();
            }

            if (transactions) {
                this.subscribeToTransactions();
            }

            if (allContract) {
                this.subscribeToAllOpenContracts();
            }

            contracts.forEach(id => this.subscribeToOpenContract(id));

            this.onAuth = () => {};
        };

        if (ticks.size !== 0) {
            this.subscribeToTicks([...ticks]);
        }

        ticksHistory.forEach((param, symbol) => this.getTickHistory(symbol, param));

        candlesHistory.forEach((param, symbol) => this.getTickHistory(symbol, param));

        proposals.forEach(proposal => this.subscribeToPriceForContractProposal(proposal));

        if (token) {
            this.authorize(token);
        } else {
            // this need to be called last as it mayb mutate
            // ticksHistory, candlesHistory and proposals
            this.sendBufferedSends();
        }
    };

    changeLanguage = (ln: string): void => {
        if (ln === this.language) {
            return;
        }
        this.socket.onclose = nullFunc;
        this.socket.close();
        this.language = ln;
        this.connect();
    };

    isReady = (): boolean => !!this.socket && this.socket.readyState === 1;

    sendBufferedSends = (): void => {
        if (this.isReady()) {
            // TODO: test fail without this check, find out why!!??
            while (this.bufferedSends.length > 0) {
                this.bufferedSends.shift()();
            }
        }
    };

    executeBufferedExecutes = (): void => {
        while (this.bufferedExecutes.length > 0) {
            this.bufferedExecutes.shift()();
        }
    };

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
    };

    publishToObservables = (json: Object): void => {
        if (typeof json.req_id === 'undefined') {
            return;
        }

        const reqId = json.req_id.toString();

        const onetimeObs = this.uncompleteOneTimeObs[reqId];

        const streamObs = this.uncompleteStreamObs[reqId];

        if (!onetimeObs && !streamObs) {
            return;
        }

        if (!json.error) {
            if (onetimeObs) {
                onetimeObs.onNext(json);
                onetimeObs.onCompleted();
            } else {
                streamObs.onNext(json);
            }
            return;
        }

        if (!shouldIgnoreError(json.error)) {
            if (onetimeObs) {
                onetimeObs.onError(new ServerError(json));
            } else {
                streamObs.onError(new ServerError(json));
            }
        }
    };

    onMessage = (message: MessageEvent): LivePromise => {
        const json = JSON.parse(message.data);

        if (json.msg_type === 'authorize' && this.onAuth) {
            this.sendBufferedSends();
        }

        if (!json.error) {
            if (json.msg_type === 'authorize' && this.onAuth) {
                this.onAuth();
            }
            this.events.emit(json.msg_type, json);
        } else {
            this.events.emit('error', json);
        }

        if (this.useRx) {
            return this.publishToObservables(json);
        }

        return this.resolvePromiseForResponse(json);
    };

    generatePromiseOrObservable = (json: Object): LivePromise => {
        const reqId = json.req_id.toString();

        if (this.useRx) {
            const obs = Observable.create(observer => {
                // if call is an subscription, store it in uncompleteStreamObs
                // ticks is a special case that's a stream without subscribe keyword
                if (json.subscribe || json.ticks) {
                    this.uncompleteStreamObs[reqId] = observer;
                } else {
                    this.uncompleteOneTimeObs[reqId] = observer;
                }

                return () => {
                    delete this.uncompleteOneTimeObs[reqId];
                    delete this.uncompleteStreamObs[reqId];
                };
            });

            const published = obs.publish();

            return published; // use hot observables
        }

        return new Promise((resolve, reject) => {
            this.unresolvedPromises[reqId] = { resolve, reject };
        });
    };

    sendAndUpdateState = (callName: string, ...param: Object): ?LivePromise => {
        const reqId = getUniqueId();
        const actualPaylod = calls[callName](...param);
        const json = {
            req_id: reqId,
            ...actualPaylod,
        };

        const socketSend = () => {
            this.sendSpy(JSON.stringify(json));
            this.socket.send(JSON.stringify(json));
            if (this.apiState[callName]) {
                this.apiState[callName](...param);
            }
        };

        if (this.isReady()) {
            socketSend();
        } else {
            this.bufferedSends.push(socketSend);
        }

        if (typeof json.req_id !== 'undefined') {
            // Set the stream id into ApiState so that we can unsubscribe later
            // TODO: hackish and need redo, this depends on object identity to works!!!
            const setState = r => {
                if (!this.apiState[callName]) return r;

                if (r.proposal_open_contract && r.proposal_open_contract.id) {
                    this.apiState[callName](...param, r.proposal_open_contract.id);
                } else if (r.proposal && r.proposal.id) {
                    this.apiState[callName](...param, r.proposal.id);
                }
                return r;
            };

            if (this.useRx) {
                const connectableObs = this.generatePromiseOrObservable(json);
                connectableObs.take(1).forEach(setState);
                return connectableObs;
            }

            return this.generatePromiseOrObservable(json).then(setState);
        }

        return undefined;
    };

    execute = (func: () => void): void => {
        if (this.isReady()) {
            func();
        } else {
            this.bufferedExecutes.push(func);
        }
    };

    // TODO: should we deprecate this? preserve for backward compatibility
    send = (json: Object): ?LivePromise => {
        console.warn('This method is deprecated, use high-level methods'); // eslint-disable-line
        const reqId = getUniqueId();
        return this.sendRaw({
            req_id: reqId,
            ...json,
        });
    };

    // TODO: should we deprecate this? preserve for backward compatibility
    sendRaw = (json: Object): ?LivePromise => {
        console.warn('This method is deprecated, use high-level methods'); // eslint-disable-line
        const socketSend = () => {
            this.sendSpy(JSON.stringify(json));
            this.socket.send(JSON.stringify(json));
        };
        if (this.isReady()) {
            socketSend();
        } else {
            this.bufferedSends.push(socketSend);
        }

        if (typeof json.req_id !== 'undefined') {
            return this.generatePromiseOrObservable(json);
        }

        return undefined;
    };
}
