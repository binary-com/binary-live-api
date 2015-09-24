import LiveEvents from './LiveEvents';

const apiUrl = 'wss://ws.binary.com/websockets/v2';

export default class LiveApi {

    static Status = {
        Unknown: 'unknown',
        Connected: 'connected'
    };

    constructor() {

        this.status = LiveApi.Status.Unknown;
        this.bufferedSends = [];
        this.bufferedExecutes = [];

        this.events = new LiveEvents();

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
    }

    onError(error) {
        console.log(error);
    }

    onMessage(message) {
        const json = JSON.parse(message.data);
        this.events.emit(json.msg_type, {
            type: json.msg_type,
            data: json[json.msg_type],
            echo: json.echo_req
        });
    }

    send(data) {
        data.uid = Math.random() * 1e17;
        if (this.isReady()) {
            this.socket.send(JSON.stringify(data));
        } else {
            this.bufferedSends.push(data);
        }
    }

    execute(func) {
        if (this.isReady()) {
            func();
        } else {
            this.bufferedExecutes.push(func);
        }
    }


    /////


    getMarketHistory(marketHistoryOptions = {}) {
        this.send({
            ticks: symbol,
            ...marketHistoryOptions
        });
    }

    getActiveSymbolsBrief() {
        this.send({
            active_symbols: 'brief'
        });
    }

    getActiveSymbolsFull() {
        this.send({
            active_symbols: 'full'
        });
    }

    getContractsForSymbol(symbol) {
        this.send({
            contracts_for: symbol
        });
    }

    getPayoutCurrencies() {
        this.send({
            payout_currencies: 1
        });
    }

    getTradingTimes(date = Date.now()) {
        const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        this.send({
            trading_times: date.toString(dateStr)
        });
    }

    ping() {
        this.send({
            ping: 1
        });
    }


    getServerTime() {
        this.send({
            time: 1
        });
    }


    /////


    subscribeToTick(symbol) {
        this.send({
            ticks: symbol
        });
    }

    subscribeToTicks(symbols) {
        symbols.forEach(this.subscribeToTick.bind(this));
    }

    getLatestPriceForContractProposal(contractProposal) {
        this.send({
            proposal: 1,
            ...contractProposal
        });
    }

    unsubscribeFromTick(symbol) {
        this.send({
            forget: symbol
        });
    }

    unsubscribeFromTicks(symbols) {
        symbols.forEach(this.unsubscribeFromTick);
    }

    unsubscribeFromAllTicks() {
        this.send({
            forget_all: "ticks"
        });
    }

    unsubscribeFromAllProposals() {
        this.send({
            forget_all: "proposal"
        });
    }

    unsubscribeFromAllPortfolios() {
        this.send({
            forget_all: "portfolio"
        });
    }

    unsubscribeFromAlProposals() {
        this.send({
            forget_all: "proposal_open_contract"
        });
    }


    /////

    authorize(token) {
        this.send({
            authorize: token
        });
    }

    getBalance() {
        this.send({
            balance: 1
        });
    }

    getStatement(statementOptions = {}) {
        this.send({
            statement: 1,
            ...statementOptions
        });
    }

    getPortfolio(subscribeToUpdates) {
        this.send({
            portfolio: 1,
            spawn: +subscribeToUpdates
        });
    }

    getPriceForOpenContract(contractId) {
        this.send({
            proposal_open_contract: 1,
            fmd_id: contractId
        });
    }

    buyContract(contractId, price) {
        this.send({
            buy: contractId,
            price: price
        });
    }

    sellContract(contractId, price) {
        this.send({
            sell: contractId,
            price: price
        });
    }
}
