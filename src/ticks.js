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
