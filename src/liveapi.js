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

    var init = function(apiToken) {

        ws = new WebSocket(apiUrl);

        ws.onopen = onOpen;
        ws.onclose = onClose;
        ws.onerror = onError;
        ws.onmessage = onMessage;

        authorize(apiToken);
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
