var LiveEvents = (function() {
    'use strict';

    var messageHandlers = {
        '*': []
    };

    var emitSingle = function (msgName, data) {
        messageHandlers[msgName].forEach(function(handler) {
            handler(JSON.parse(data));
        });
    };

    var emitWildcard = function (data) {
        messageHandlers['*'].forEach(function(handler) {
            handler(JSON.parse(data));
        });
    };

    var emit = function (msgName, data) {

        if (!messageHandlers[msgName]) return;

        emitSingle(msgName, data);
        emitWildcard(data);
    };

    var on = function (msgName, callback) {

        if (!messageHandlers[msgName]) messageHandlers[msgName] = [];

        messageHandlers[msgName].push(callback);
    };

    return {
        emit: emit,
        on: on
    };
})();

var LiveApi = (function () {
    'use strict';

    var ws,
        status = 'unknown',
        apiUrl = 'wss://ws.binary.com/websockets/contracts',
        bufferedSends = [],
        bufferedExecutes = [];

    var isReady = function() {
        return ws && ws.readyState === 1;
    };

    var sendBufferedSends = function() {
        while (bufferedSends.length > 0) {
            ws.send(JSON.stringify(bufferedSends.shift()));
        }
    };

    var executeBufferedExecutes = function() {
        while (bufferedExecutes.length > 0) {
            bufferedExecutes.shift()();
        }
    };

    var onOpen = function() {
        sendBufferedSends();
        executeBufferedExecutes();
    };

    var onClose = function() {
    };

    var onError = function(error) {
        console.log(error);
    };

    var onMessage = function(e) {
        LiveEvents.emit(e.type, e.data);
    };

    var init = function(customApiUrl) {

        ws = new WebSocket(customApiUrl || apiUrl);

        ws.onopen = onOpen;
        ws.onclose = onClose;
        ws.onerror = onError;
        ws.onmessage = onMessage;
    };

    var send = function(data) {
        if (isReady()) {
            ws.send(JSON.stringify(data));
        } else {
            bufferedSends.push(data);
        }
    };

    var execute = function(func) {
        if (isReady()) {
            func();
        } else {
            bufferedExecutes.push(func);
        }
    };

    var authorize = function(token) {
        send({ authorize: token });
    };

    var getOfferings = function() {
        send({ offerings: {} });
    };

    var trackSymbol = function(symbol) {
        send({ ticks: symbol });
    };

    var trackSymbols = function(symbols) {
        symbols.forEach(trackSymbol);
    };

    var untrackSymbol = function(symbol) {
        send({ forget: symbol });
    };

    var untrackSymbols = function(symbols) {
        symbols.forEach(untrackSymbols);
    };

    var getContractsForSymbol = function(symbol) {
        send({ contracts_for: symbol });
    };

    var getActiveSymbolsByName = function() {
        send({ active_symbols: 'display_name' });
    };

    var getActiveSymbolsBySymbol = function() {
        send({ active_symbols: 'symbol' });
    };

    var getPrice = function(contractProposal) {
        contractProposal.proposal = 1;
        send(contractProposal);
    };

    var buyContract = function(contractId, price) {
        send({
            buy: contractId,
            price: price
        });
    };

    var getPortfolio = function() {
        send({ portfolio: 1 });
    };

    var sellContract = function(contractId, price) {
        send({
            sell: contractId,
            price: price
        });
    };


    return {
        init: init,
        status: status,
        send: send,
        execute: execute,
        authorize: authorize,

        getOfferings: getOfferings,
        trackSymbol: trackSymbol,
        trackSymbols: trackSymbols,
        untrackSymbol: untrackSymbol,
        untrackSymbols: untrackSymbols,
        getActiveSymbolsByName: getActiveSymbolsByName,
        getActiveSymbolsBySymbol: getActiveSymbolsBySymbol,
        getContractsForSymbol: getContractsForSymbol,
        getPrice: getPrice,
        buyContract: buyContract,
        getPortfolio: getPortfolio,
        sellContract: sellContract
    };
})();

var Ticks = (function() {
    'use strict';

    var ticks = {};

    var symbols = function() {
        return Object.keys(ticks);
    };

    var appendData = function (data) {
        var symbol = data.ticks;

        if (!ticks[symbol]) ticks[symbol] = { history: [] };

        ticks[symbol].history.push({
            epoch: data.epoch,
            quote: data.quote
        });
    };

    var history = function (symbol) {
        return ticks[symbol] ? ticks[symbol].history : [];
    };

    var current = function (symbol) {

        if (!ticks[symbol]) return {};

        var lastTick = ticks[symbol].history[ticks[symbol].history.length - 1];

        return {
            symbol: symbol,
            diff: diff(symbol),
            quote: lastTick.quote,
            epoch: lastTick.epoch,
        };
    };

    var diff = function (symbol) {

        var t = ticks[symbol];

        if (!t || !t.history || t.history.length <= 1) return 0;

        return t.history[t.history.length - 1].quote - t.history[t.history.length - 2].quote;
    };

    return {
        symbols: symbols,
        appendData: appendData,
        history: history,
        current: current,
        diff: diff
    };
})();

var LiveData = (function () {
    'use strict';

    var offerings, portfolio, activeSymbols;

    var offeringsHandler = function(data) {
        offerings = data.offerings.offerings;
    };

    var portfolioHandler = function(data) {
        portfolio = data.portfolio_stats;
    };

    var activeSymbolsHandler = function(data) {
        activeSymbols = data.active_symbols;
    };

    LiveEvents.on('message', function(data) {
        if (data.offerings) {
            offeringsHandler(data);
        } else if (data.ticks) {
            Ticks.appendData(data);
        } else if (data.portfolio_stats) {
            portfolioHandler(data);
        } else if (data.active_symbols) {
            activeSymbolsHandler(data);
            //trackActiveSymbols();
        }
    });

    var trackActiveSymbols = function() {

        var list = Object.keys(activeSymbols).map(function(s) {
            return activeSymbols[s].symbol;
        });

        LiveApi.trackSymbols(list);
    };

    var init = function() {

        LiveApi.init();

        LiveApi.getPortfolio();
        LiveApi.getOfferings();
        LiveApi.getActiveSymbolsByName();
    };

    return {
        init: init,
        offerings: function () { return offerings; },
        activeSymbols: function () { return activeSymbols; },
        portfolio: function () { return portfolio; },        
        Ticks: Ticks,
        trackActiveSymbols: trackActiveSymbols
    };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        LiveEvents: LiveEvents,
        LiveApi: LiveApi,
        LiveData: LiveData
    };
}
