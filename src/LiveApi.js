import LiveEvents from './LiveEvents';

const MockWebSocket = () => {};
let WebSocket = typeof window !== 'undefined' ? window.WebSocket : MockWebSocket;

const noSubscriptions = () => ({
    ticks: {},
    priceProposal: null,
});

export default class LiveApi {

    static Status = {
        Unknown: 'unknown',
        Connected: 'connected',
    };

    constructor({ apiUrl = 'wss://ws.binaryws.com/websockets/v3', language = 'en', websocket } = {}) {
        // options is arguments
        const options = arguments[0];
        this.apiUrl = apiUrl;
        this.language = language;
        this.status = LiveApi.Status.Unknown;
        this.subscriptions = noSubscriptions();

        this.bufferedSends = [];
        this.bufferedExecutes = [];
        this.unresolvedPromises = {};

        this.events = new LiveEvents();

        if (websocket) {
            WebSocket = options.websocket;
        }

        this.connect();
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
        const reqId = json.req_id.toString();
        const promise = this.unresolvedPromises[reqId];
        if (promise) {
            delete this.unresolvedPromises[reqId];
            if (!json.error) {
                promise.resolve(json);
            } else {
                promise.reject(json.error);
            }
        }
    }

    onMessage(message) {
        const json = JSON.parse(message.data);

        if (!json.error) {
            this.events.emit(json.msg_type, json);
        }

        if (json.req_id) {
            return this.resolvePromiseForResponse(json);
        }
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

    // Unauthenticated Calls

    getActiveSymbolsBrief() {
        return this.send({
            active_symbols: 'brief',
        });
    }

    getActiveSymbolsFull() {
        return this.send({
            active_symbols: 'full',
        });
    }

    getAssetIndex() {
        return this.send({
            asset_index: 1,
        });
    }

    getContractsForSymbol(symbol) {
        return this.send({
            contracts_for: symbol,
        });
    }

    getLandingCompany(landingCompany) {
        return this.send({
            landing_company: landingCompany,
        });
    }

    getLandingCompanyDetails(landingCompany) {
        return this.send({
            landing_company_details: landingCompany,
        });
    }

    createVirtualAccount(options) {
        return this.send({
            new_account_virtual: 1,
            ...options,
        });
    }

    getPayoutCurrencies() {
        return this.send({
            payout_currencies: 1,
        });
    }

    ping() {
        return this.send({
            ping: 1,
        });
    }

    getServerTime() {
        return this.send({
            time: 1,
        });
    }

    getPaymentAgentsForCountry(countryCode) {
        return this.send({
            paymentagent_list: countryCode,
        });
    }

    getResidences() {
        return this.send({
            residence_list: 1,
        });
    }

    getStatesForCountry(countryCode) {
        return this.send({
            states_list: countryCode,
        });
    }

    getTickHistory(symbol, options = {}) {
        return this.send({
            ticks_history: symbol,
            ...options,
        });
    }

    getTradingTimes(date = new Date()) {
        const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        return this.send({
            trading_times: dateStr,
        });
    }

    getPriceProposalForContract(options) {
        return this.send({
            proposal: 1,
            ...options,
        });
    }

    verifyEmail(email, type) {
        return this.send({
            verify_email: email,
            type: type,
        });
    }


    // Unathenticated Streams

    subscribeToTick(symbol) {
        this.subscriptions.ticks[symbol] = true;

        this.send({
            ticks: symbol,
        });
    }

    subscribeToTicks(symbols) {
        symbols.forEach(s => this.subscriptions.ticks[s] = true);

        this.send({
            ticks: symbols,
        });
    }

    subscribeToPriceForContractProposal(options) {
        return this.send({
            proposal: 1,
            subscribe: 1,
            ...options,
        });
    }

    subscribeToBalance() {
        return this.send({
            balance: 1,
            subscribe: 1,
        });
    }

    subscribeToOpenContract(contractId) {
        return this.send({
            proposal_open_contract: 1,
            subscribe: 1,
            fmd_id: contractId,
        });
    }

    subscribeToAllOpenContracts() {
        return this.send({
            proposal_open_contract: 1,
            subscribe: 1,
        });
    }

    unsubscribeFromTick(symbol) {
        delete this.subscriptions.ticks[symbol];

        return this.send({
            forget: symbol,
        });
    }

    unsubscribeFromTicks(symbols) {
        symbols.forEach(this.unsubscribeFromTick);
    }

    unsubscribeFromAllTicks() {
        this.subscriptions.ticks = {};

        return this.send({
            forget_all: 'ticks',
        });
    }

    unsubscribeFromAllProposals() {
        this.subscriptions.priceProposal = null;

        return this.send({
            forget_all: 'proposal',
        });
    }

    unsubscribeByID(id) {
        return this.send({
            forget: id,
        });
    }

    unsubscribeFromAllPortfolios() {
        this.subscriptions.portfolio = false;

        return this.send({
            forget_all: 'portfolio',
        });
    }

    unsubscribeFromAlProposals() {
        this.subscriptions = noSubscriptions();

        return this.send({
            forget_all: 'proposal_open_contract',
        });
    }


    // Authenticated Calls (no side effects)


    authorize(token) {
        this.token = token;
        return this.send({
            authorize: token,
        });
    }

    getAccountLimits() {
        return this.send({
            get_limits: 1,
        });
    }

    getAccountSettings() {
        return this.send({
            get_settings: 1,
        });
    }

    getAccountStatus() {
        return this.send({
            get_account_status: 1,
        });
    }

    getSelfExclusion() {
        return this.send({
            get_self_exclusion: 1,
        });
    }

    getCashierLockStatus() {
        return this.send({
            cashier_password: 1,
        });
    }

    getStatement(options = {}) {
        return this.send({
            statement: 1,
            ...options,
        });
    }

    getPortfolio() {
        return this.send({
            portfolio: 1,
        });
    }

    getProfitTable(options = {}) {
        return this.send({
            profit_table: 1,
            ...options,
        });
    }

    // Authenticated Calls (with side effects)

    buyContract(contractId, price) {
        return this.send({
            buy: contractId,
            price,
        });
    }

    sellContract(contractId, price) {
        return this.send({
            sell: contractId,
            price,
        });
    }

    createRealAccount(options) {
        return this.send({
            new_account_real: 1,
            ...options,
        });
    }

    createRealAccountMaltaInvest(options) {
        return this.send({
            new_account_maltainvest: 1,
            ...options,
        });
    }

    withdrawToPaymentAgent(options) {
        return this.send({
            paymentagent_withdraw: 1,
            ...options,
        });
    }

    paymentAgentTransfer(options) {
        return this.send({
            paymentagent_transfer: 1,
            ...options,
        });
    }

    setSelfExclusion(options) {
        return this.send({
            set_self_exclusion: 1,
            ...options,
        });
    }

    topUpVirtualAccount() {
        return this.send({
            "topup_virtual": 1,
        });
    }

    setCashierLock(options) {
        return this.send({
            cashier_password: 1,
            ...options,
        });
    }

    changePassword(options) {
        return this.send({
            change_password: 1,
            ...options,
        });
    }

    setAccountSettings(options) {
        return this.send({
            set_settings: 1,
            ...options,
        });
    }
}
