import { LiveApi } from '../lib/';

var api = new LiveApi();

api.authorize('3wXTOFIMNvhIs5UpARelBFQHzRhd2k2tQoxIK1VarnFOeAmd');


function tickHistoryDemo() {
    api.events.on('history', function(response) {
        console.log(response.data);
    });
    api.getMarketHistory({symbol: 'frxUSDJPY', end: 'latest', count: 10});
}

function forgetDemo() {
    api.unsubscribeFromAllTicks();
}

function tickStreamDemo() {
    api.events.on('tick', function(response) {
        console.log(response.data);
    });
    api.subscribeToTick('frxUSDJPY');
}

function pingDemo() {
    api.events.on('ping', function(response) {
        console.log(response.data);
    });
    api.ping();
}

function openPositionsDemo() {
    api.events.on('portfolio', function(response) {
        console.log(response.data);
    });
    api.getPortfolio();
}

function tradingTimesDemo() {
    api.events.on('trading_times', function(response) {
        console.log(response.data);
    });
    api.getTradingTimes();
}


tradingTimesDemo();
