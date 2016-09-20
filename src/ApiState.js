const getInitialState = () => ({
    token: undefined,
    balance: false,
    contracts: new Set(),
    allContract: false,
    transactions: false,
    ticks: new Set(),
    ticksHistory: new Map(),
    candlesHistory: new Map(),
    proposals: new Set(),
    streamIdMapping: new Map(),
});

export default class ApiState {
    constructor() {
        this.state = getInitialState();
    }

    resetState = () => {
        this.state = getInitialState();
    };

    getState = () => this.state;

    authorize = (token: string) => {
        this.state.token = token;
    };


    subscribeToBalance = () => {
        this.state.balance = true;
    };

    unsubscribeFromBalance = () => {
        this.state.balance = false;
    };


    subscribeToOpenContract = (contractId: string, streamId: string) => {
        if (streamId) {
            this.state.contracts.add(contractId);
            this.state.streamIdMapping.set(streamId, contractId);
        }
    };

    unsubscribeFromAllProposalsOpenContract = () => {
        this.state.contracts.clear();
        this.state.allContract = false;
    }

    subscribeToAllOpenContracts = () => {
        this.state.allContract = true;
    };


    subscribeToTransactions = () => {
        this.state.transactions = true;
    };

    unsubscribeFromTransactions = () => {
        this.state.transactions = false;
    };


    subscribeToTick = (symbol: string) => {
        this.state.ticks.add(symbol);
    };

    subscribeToTicks = (symbols: string[]) => {
        symbols.forEach(this.subscribeToTick);
    };

    unsubscribeFromAllTicks = () => {
        this.state.ticks.clear();
        this.state.ticksHistory.clear();
    }

    unsubscribeFromAllCandles = () => {
        this.state.candlesHistory.clear();
    }

    getTickHistory = (symbol: string, params: Object) => {
        if (params && params.subscribe === 1) {
            if (params.style === 'candles') {
                this.state.candlesHistory.set(symbol, params);
            } else {
                this.state.ticksHistory.set(symbol, params);
            }
        }
    };

    subscribeToPriceForContractProposal = (options: Object, streamId: string) => {
        if (streamId) {
            this.state.proposals.add(options);
            this.state.streamIdMapping.set(streamId, options);
        }
    };

    unsubscribeFromAllProposals = () => {
        this.state.proposals.clear();
    };


    // special care needed to forget subscription, as backends rely on
    // and id instead of more natural keys like symbol and payload
    unsubscribeByID = (id) => {
        this.state.streamIdMapping.forEach((payload, streamId) => {
            if (streamId === id) {
                this.state.contracts.delete(payload);
                this.state.proposals.delete(payload);
            }
        });
        this.state.streamIdMapping.delete(id);
    }
}
