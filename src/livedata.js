import { instance as LiveEvents } from './LiveEvents';
import LiveApi from './LiveApi';
import Ticks from './Ticks';

export default class LiveData {

    constructor(apiToken) {

        this.offerings = [];
        this.portfolio = {};
        this.activeSymbols = [];

        this.on = ::LiveEvents.on;
        this.on('message', ::this.messageProcessing);

        this.LiveApi = new LiveApi(apiToken);
        this.ticks = new Ticks();
    }

    offeringsHandler(data) {
        this.offerings = data.offerings.offerings;
    }

    portfolioHandler(data) {
        this.portfolio = data.portfolio_stats;
    }

    activeSymbolsHandler(data) {
        this.activeSymbols = data.active_symbols;
    }

    messageProcessing(data) {
        if (data.offerings) {
            this.offeringsHandler(data);
        } else if (data.ticks) {
            this.ticks.appendData(data);
        } else if (data.portfolio_stats) {
            this.portfolioHandler(data);
        } else if (data.active_symbols) {
            this.activeSymbolsHandler(data);
            this.trackActiveSymbols();
        }
    }

    trackActiveSymbols() {

        const list = Object.keys(activeSymbols).map(s => activeSymbols[s].symbol);

        this.LiveApi.trackSymbols(list);
    }
}
