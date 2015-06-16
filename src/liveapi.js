var LiveApi = (function () {
    'use strict';

    var ws,
        status = 'unknown',
        apiUrl = 'wss://ws.binary.com/websockets/contracts',
        bufferedSends = [];

    var onOpen = function() {
        while (bufferedSends.length > 0) {
            ws.send(JSON.stringify(bufferedSends.shift()));
        }
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
        if (ws && ws.readystate === 1) {
            ws.send(JSON.stringify(data));
        } else {
            bufferedSends.push(data);
        }
    };

    var getOfferings = function(id) {
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

    var untrackSymbols = function(symbol) {
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
