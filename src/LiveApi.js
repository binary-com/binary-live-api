import LiveEvents from './LiveEvents';

let WebSocket = typeof window !== 'undefined' && window.WebSocket;

const noSubscriptions = () => ({
    ticks: {},
    priceProposal: null,
});

export default class LiveApi {

    static Status = {
        Unknown: 'unknown',
        Connected: 'connected'
    };

    constructor({apiUrl = 'wss://www.binary.com/websockets/v3', websocket} = {}) {
        // options is arguments
        var options = arguments[0];
        this.apiUrl = apiUrl;
        this.status = LiveApi.Status.Unknown;
        this.subscriptions = noSubscriptions();

        this.bufferedSends = [];
        this.bufferedExecutes = [];
        this.unresolvedPromises = {};

        this.events = new LiveEvents();

        if (websocket) {
            WebSocket = options.websocket;
        }

        this.connect(this.apiUrl || 'wss://www.binary.com/websockets/v3');
    }

    connect() {
        this.socket = new WebSocket(this.apiUrl);
        this.socket.onopen = ::this.onOpen;
        this.socket.onclose = ::this.onClose;
        this.socket.onerror = ::this.onError;
        this.socket.onmessage = ::this.onMessage;
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
        setTimeout(function() {
            this.connect();
            this.resubscribe();
        }.bind(this), 1000);
    }

    onError(error) {
        // for process manager like pm2.
+        // It's necessary to print error with console.error.
+        // It will make error readable on error.log
+        console.error(error);
+        
+        // And also make process exiting to respawn.
+        if (typeof process !== "undefined") {
+            process.exit();
+        }
    }

    onMessage(message) {
        const json = JSON.parse(message.data);

        this.events.emit(json.msg_type, json);

        if (!json.echo_req.passthrough || !json.echo_req.passthrough.uid) {
            return;
        }

        const promise = this.unresolvedPromises[json.echo_req.passthrough.uid];
        if (promise) {
            delete this.unresolvedPromises[json.echo_req.passthrough.uid];
            if (!json.error) {
                promise.resolve(json);
            } else {
                promise.reject(json.error);
            }
        }
    }

    sendRaw(data) {
        if (this.isReady()) {
            this.socket.send(JSON.stringify(data));
        } else {
            this.bufferedSends.push(data);
        }
        var promise = new Promise((resolve, reject) => {
            if (data.passthrough) {
                this.unresolvedPromises[data.passthrough.uid] = { resolve, reject };
            }
        });
        return promise;
    }

    send(data) {
        data.passthrough = data.passthrough || { };
        data.passthrough.uid = (Math.random() * 1e17).toString();
        return this.sendRaw(data);
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

    ///// Unauthenticated Calls

    getActiveSymbolsBrief() {
        return this.send({
            active_symbols: 'brief'
        });
    }

    getActiveSymbolsFull() {
        return this.send({
            active_symbols: 'full'
        });
    }

    getAssetIndex() {
        return this.send({
            asset_index: 1
        });
    }

    getContractsForSymbol(symbol) {
        return this.send({
            contracts_for: symbol
        });
    }

    getLandingCompany(landingCompany) {
        return this.send({
            landing_company: landingCompany
        });
    }

    getLandingCompanyDetails(landingCompany) {
        return this.send({
            landing_company_details: landingCompany
        });
    }

    createVirtualAccount(options) {
        return this.send({
            new_account_virtual: 1,
            ...options
        });
    }

    getPayoutCurrencies() {
        return this.send({
            payout_currencies: 1
        });
    }

    ping() {
        return this.send({
            ping: 1
        });
    }

    getServerTime() {
        return this.send({
            time: 1
        });
    }

    getResidences() {
        return this.send({
            residence_list: 1
        });
    }

    getStatesForCountry(countryCode) {
        return this.send({
            states_list: countryCode
        });
    }

    getTickHistory(symbol, options = {}) {
        return this.send({
            ticks_history: symbol,
            ...options
        });
    }

    getTradingTimes(date = new Date()) {
        const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        return this.send({
            trading_times: dateStr
        });
    }

    verifyEmail(email) {
        return this.send({
            verify_email: email
        });
    }


    ///// Unathenticated Streams

    subscribeToTick(symbol) {
        this.subscriptions.ticks[symbol] = true;

        this.send({
            ticks: symbol
        });
    }

    subscribeToTicks(symbols) {
        symbols.forEach(this.subscribeToTick.bind(this));
    }

    subscribeToPriceForContractProposal(options) {
        return this.send({
            proposal: 1,
            ...options
        });
    }

    subscribeToBalance() {
        return this.send({
            balance: 1
        });
    }

    subscribeToOpenContract(contractId) {
        return this.send({
            proposal_open_contract: 1,
            fmd_id: contractId
        });
    }

    subscribeToAllOpenContracts() {
        return this.send({
            proposal_open_contract: 1,
        });
    }

    unsubscribeFromTick(symbol) {
        delete this.subscriptions.ticks[symbol];

        return this.send({
            forget: symbol
        });
    }

    unsubscribeFromTicks(symbols) {
        symbols.forEach(this.unsubscribeFromTick);
    }

    unsubscribeFromAllTicks() {
        this.subscriptions.ticks = {};

        return this.send({
            forget_all: "ticks"
        });
    }

    unsubscribeFromAllProposals() {
        this.subscriptions.priceProposal = null;

        return this.send({
            forget_all: "proposal"
        });
    }

    unsubscribeFromAllPortfolios() {
        this.subscriptions.portfolio = false;

        return this.send({
            forget_all: "portfolio"
        });
    }

    unsubscribeFromAlProposals() {
        this.subscriptions = noSubscriptions();

        return this.send({
            forget_all: "proposal_open_contract"
        });
    }


    ///// Authenticated Calls (no side effects)


    authorize(token) {
        return this.send({
            authorize: token
        });
    }

    getAccountLimits() {
        return this.send({
            get_limits: 1
        });
    }

    getAccountSettings() {
        return this.send({
            get_settings: 1
        });
    }

    getAccountStatus() {
        return this.send({
            get_account_status: 1
        });
    }

    getStatement(options = {}) {
        return this.send({
            statement: 1,
            ...options
        });
    }

    getPortfolio() {
        return this.send({
            portfolio: 1
        });
    }

    getProfitTable(options = {}) {
        return this.send({
            profit_table: 1,
            ...options
        });
    }

    ///// Authenticated Calls (with side effects)

    buyContract(contractId, price) {
        return this.send({
            buy: contractId,
            price: price
        });
    }

    sellContract(contractId, price) {
        return this.send({
            sell: contractId,
            price: price
        });
    }

    setAccountSettings(options) {
        return this.send({
            set_settings: 1,
            ...options
        });
    }
}
