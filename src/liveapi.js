import LiveEvents from './LiveEvents';

export default class LiveApi extends LiveEvents {

    static apiUrl = 'wss://ws.binary.com/websockets/contracts';

    constructor() {
        super();

        this.status = 'unknown',
        this.bufferedSends = [],
        this.bufferedExecutes = [];

        this.socket = new WebSocket(apiUrl);
        this.socket.onopen = this.onOpen;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
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

    onMessage(e) {
        LiveEvents.emit(e.type, e.data);
    }

    send(data) {
        if (isReady()) {
            this.socket.send(JSON.stringify(data));
        } else {
            this.bufferedSends.push(data);
        }
    }

    execute(func) {
        if (isReady()) {
            func();
        } else {
            this.bufferedExecutes.push(func);
        }
    }

    authorize(token) {
        this.send({ authorize: token });
    }

    getOfferings() {
        this.send({ offerings: {} });
    }

    trackSymbol(symbol) {
        this.send({ ticks: symbol });
    }

    trackSymbols(symbols) {
        symbols.forEach(this.trackSymbol);
    }

    untrackSymbol(symbol) {
        this.send({ forget: symbol });
    }

    untrackSymbols(symbols) {
        symbols.forEach(this.untrackSymbol);
    }

    getMarketHistory(symbol, start, end, count) {
        this.send({ ticks: symbol, end: end });
    }

    getContractsForSymbol(symbol) {
        this.send({ contracts_for: symbol });
    }

    getActiveSymbolsByName() {
        this.send({ active_symbols: 'display_name' });
    }

    getActiveSymbolsBySymbol() {
        this.send({ active_symbols: 'symbol' });
    }

    getPrice(contractProposal) {
        contractProposal.proposal = 1;
        this.send(contractProposal);
    }

    buyContract(contractId, price) {
        this.send({
            buy: contractId,
            price: price
        });
    }

    getPortfolio() {
        this.send({ portfolio: 1 });
    }

    sellContract(contractId, price) {
        this.send({
            sell: contractId,
            price: price
        });
    }
}
