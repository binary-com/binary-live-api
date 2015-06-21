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
            trackActiveSymbols();
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
