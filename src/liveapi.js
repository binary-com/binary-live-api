import LiveEvents from './LiveEvents';

const apiUrl = 'wss://ws.binary.com/websockets/v2';

const noSubscriptions = () => ({
    ticks: {},
    portfolio: false,
    priceProposal: null,
});

export default class LiveApi {

    static Status = {
        Unknown: 'unknown',
        Connected: 'connected'
    };

    constructor() {
        this.status = LiveApi.Status.Unknown;
        this.subscriptions = noSubscriptions();

        this.bufferedSends = [];
        this.bufferedExecutes = [];
        this.unresolvedPromises = {};

        this.events = new LiveEvents();

        this.connect();
    }

    connect() {
        this.socket = new WebSocket(apiUrl);
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
        console.log(error);
    }

    onMessage(message) {
        const json = JSON.parse(message.data);
        const response = {
            type: json.msg_type,
            data: json[json.msg_type],
            echo: json.echo_req,
            error: json.error
        };
        this.events.emit(json.msg_type, response);

        if (!json.echo_req.passthrough || !json.echo_req.passthrough.uid) {
            return;
        }

        const promise = this.unresolvedPromises[json.echo_req.passthrough.uid];
        if (promise) {
            delete this.unresolvedPromises[json.echo_req.passthrough.uid];
            if (!response.error) {
                promise.resolve(response);
            } else {
                promise.reject(response.error);
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
            this.unresolvedPromises[data.uid] = { resolve, reject };
        });
        return promise;
    }

    send(data) {
        data.passthrough = { uid: (Math.random() * 1e17).toString() };
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
        const { ticks, portfolio, priceProposal } = this.subscriptions;

        this.subscribeToTicks(Object.keys(ticks));

        if (portfolio) {
            this.getPortfolio(true);
        }

        if (priceProposal) {
            this.getPriceForContractProposal(priceProposal);
        }
    }

    /////


    getTickHistory(symbol, tickHistoryOptions = {}) {
        return this.send({
            ticks: symbol,
            ...tickHistoryOptions
        });
    }

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

    getContractsForSymbol(symbol) {
        return this.send({
            contracts_for: symbol
        });
    }

    getPayoutCurrencies() {
        return this.send({
            payout_currencies: 1
        });
    }

    getTradingTimes(date = new Date()) {
        const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return this.send({
            trading_times: dateStr
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


    /////


    subscribeToTick(symbol) {
        this.subscriptions.ticks[symbol] = true;

        this.send({
            ticks: symbol
        });
    }

    subscribeToTicks(symbols) {
        symbols.forEach(this.subscribeToTick.bind(this));
    }

    getPriceForContractProposal(contractProposal) {
        return this.send({
            proposal: 1,
            ...contractProposal
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
        this.subscriptions.ticks[symbol] = {};

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


    /////


    authorize(token) {
        return this.send({
            authorize: token
        });
    }

    getBalance() {
        return this.send({
            balance: 1
        });
    }

    getStatement(statementOptions = {}) {
        return this.send({
            statement: 1,
            ...statementOptions
        });
    }

    getPortfolio(subscribeToUpdates = false) {
        if (subscribeToUpdates) {
            this.subscriptions.portfolio = true;
        }
        return this.send({
            portfolio: 1,
            spawn: +subscribeToUpdates
        });
    }

    getPriceForOpenContract(contractId) {
        return this.send({
            proposal_open_contract: 1,
            fmd_id: contractId
        });
    }

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
}
