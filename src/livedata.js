import { instance as LiveEvents } from './LiveEvents';
import LiveApi from './LiveApi';
import Ticks from './Ticks';

export default class LiveData {

    constructor(apiToken) {

        this.offerings = [];
        this.contracts = [];
        this.activeSymbols = [];

        this.on = ::LiveEvents.on;
        this.on('message', ::this.messageProcessing);

        this.api = new LiveApi(apiToken);
        this.ticks = new Ticks();
    }

    dataChanged(whatData) {
        if (this.onDataChange) this.onDataChange(whatData);
    }

    authorizeResponseHandler(data) {
        this.balance = {
            currency: data.currency,
            amount: data.balance
        }
        this.dataChanged('balance');
    }

    offeringsHandler(data) {
        this.offerings = data.offerings.offerings;
        this.dataChanged('offerings');
    }

    portfolioHandler(data) {
        this.portfolio = data.portfolio_stats;
    }

    activeSymbolsHandler(data) {
        this.activeSymbols = data.active_symbols;
        this.dataChanged('activeSymbols');
    }

    contractHandler(data) {
        this.contracts.push(data);
        this.dataChanged('contracts');
    }

    contractUpdateHandler(data) {
        const contract = this.contracts.find(c => c.id == data.id);
        contract.ask_price = data.ask_price;
        contract.spot_time = data.spot_time;
        contract.bid_price = data.bid_price;
        this.dataChanged('contracts');
    }

    messageProcessing(data) {
        if (data.authorize) {
            this.authorizeResponseHandler(data);
        } else if (data.offerings) {
            this.offeringsHandler(data);
        } else if (data.ticks) {
            this.ticks.appendData(data);
        } else if (data.portfolio_stats) {
            this.portfolioHandler(data);
        } else if (data.active_symbols) {
            this.activeSymbolsHandler(data);
            this.trackActiveSymbols();
        } else if (data.fmb_id) {
            this.contractHandler(data);
        } else if (data.ask_price && data.spot_time && data.bid_price) {
            this.contractUpdateHandler(data);
        }
    }

    trackActiveSymbols() {

        const list = Object.keys(activeSymbols).map(s => activeSymbols[s].symbol);

        this.api.trackSymbols(list);
    }
}

export const instance = new LiveData();
