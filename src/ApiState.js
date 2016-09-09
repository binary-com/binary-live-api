const getInitialState = () => ({
    token: undefined,
    balance: false,
    contracts: new Set(),
    allContract: false,
    transactions: false,
    ticks: new Set(),
    ticksHistory: new Map(),
    proposals: new Set(),
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

    subscribeToOpenContract = contractId => {
        this.state.contracts.add(contractId);
    };

    unsubscribeFromAllProposalsOpenContract = () => {
        this.state.contracts.clear();
    }

    subscribeToAllOpenContracts = () => {
        this.state.allContract = true;
    };

    unsubscribeFromAllOpenContracts = () => {
        this.state.allContract = false;
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

    unsubscribeFromTick = (symbol: string) => {
        this.state.ticks.delete(symbol);
        this.state.ticksHistory.delete(symbol);
    };

    unsubscribeFromTicks = (symbols: string[]) => {
        symbols.forEach(this.unsubscribeFromTick);
    };

    getTickHistory = (symbol: string, params: Object) => {
        if (params && params.subscribe === 1) {
            this.state.ticksHistory.set(symbol, params);
        }
    };

    unsubscribeFromAllTicks = () => {
        this.state.ticks.clear();
    };

    subscribeToPriceForContractProposal = (options: Object) => {
        this.state.proposals.add(options);
    };

    unsubscribeFromAllProposals = () => {
        this.state.proposals.clear();
    };

    unsubscribeByID = (id) => {
        this.state.contracts.delete(id);
        this.state.proposals.delete(id);
    }
}
