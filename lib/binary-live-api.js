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

    return {
        init: init,
        status: status,
        send: send,
    };
})();

var LiveData = (function () {
    'use strict';

    var Ticks = (function() {

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
            return ticks[symbol].history;
        };

        var current = function (symbol) {
            var lastTick = ticks[symbol].history[ticks[symbol].history.length - 1];

            lastTick.diff = diff(symbol);

            return lastTick;
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

    var offerings, ticks, portfolio;

    var offeringsHandler = function(data) {
        offerings = data.offerings.offerings;
    };

    var portfolioHandler = function(data) {

    };

    LiveEvents.on('message', function(data) {
        if (data.offerings) {
            offeringsHandler(data);
        } else if (data.ticks) {
            Ticks.appendData(data);
        } else if (data.portfolio) {
            portfolioHandler(data);
        }
    });

    var init = function() {

        LiveApi.init();

        LiveApi.send({portfolio:1});
        LiveApi.send({offerings:{}});
        LiveApi.send({ ticks: 'R_100' });
        LiveApi.send({ ticks: 'frxXPDUSD' });
    }

    return {
        init: init,
        offerings: offerings,
        Ticks: Ticks,
        portfolio: portfolio
    };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        LiveEvents: LiveEvents,
        LiveApi: LiveApi,
        LiveData: LiveData
    };
}
