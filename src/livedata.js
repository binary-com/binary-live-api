import LiveApi from './LiveApi';
import Ticks from './Ticks';

export default class LiveData {

    constructor(apiToken) {

        this.offerings = [];
        this.contracts = {};
        this.portfolio = [];
        this.activeSymbols = [];

        this.ticks = new Ticks();

        this.api = new LiveApi();

        this.events = this.api.events;
        this.events.on('authorize', ::this.authorizeResponseHandler);
        this.events.on('portfolio', ::this.portfolioHandler);
        this.events.on('offerings', ::this.offeringsHandler);
        this.events.on('ticks', ::this.offeringsHandler);
        this.events.on('symbols', ::this.activeSymbolsHandler); //this.trackActiveSymbols();
        this.events.on('contracts', ::this.contractHandler);

        this.api.authorize(apiToken);
    }

    dataChanged(whatData) {
        if (this.onDataChange) this.onDataChange(whatData);
    }

    authorizeResponseHandler(r) {

        this.balance = {
            currency: r.data.currency,
            amount: r.data.balance
        };
        this.dataChanged('balance');
    }

    ticksHandler(r) {
        this.ticks.appendData(r.data);
        this.dataChanged('ticks');
    }

    offeringsHandler(r) {
        this.offerings = r.data.offerings;
        this.dataChanged('offerings');
    }

    portfolioHandler(r) {

        const entry = this.portfolio.find(c => c.id == r.data.id);

        if (!entry) {
            this.portfolio.push(r.data);
        } else {
            Object.assign(entry, r.data);
        }

        this.dataChanged('portfolio');
    }

    activeSymbolsHandler(r) {
        this.activeSymbols = r.data;
        this.dataChanged('activeSymbols');
    }

    contractHandler(r) {
        this.contracts = r.data;
        this.dataChanged('contracts');
    }

    trackActiveSymbols() {

        const list = Object.keys(activeSymbols).map(s => activeSymbols[s].symbol);

        this.api.trackSymbols(list);
    }
}
