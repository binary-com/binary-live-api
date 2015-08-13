import LiveEvents from './LiveEvents';

const apiUrl = 'wss://ws.binary.com/websockets/contracts';

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
        symbols.forEach(this.trackSymbol.bind(this));
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

    getStatement() {
        this.send({ statement: {} });
    }

    sellContract(contractId, price) {
        this.send({
            sell: contractId,
            price: price
        });
    }
}
