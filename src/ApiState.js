const getInitialState = () => ({
    token: undefined,
    balance: false,
    portfolio: false,
    transactions: false,
    ticks: new Set(),
    proposals: new Set(),
});

export default class ApiState {
    constructor() {
        this.state = getInitialState();
    }

    resetState = () => {
        this.state = getInitialState();
    };

    getState = () => {
        return this.state;
    }

    authorize = (token: string) => {
        this.state.token = token;
    };

    subscribeToBalance = () => {
        this.state.balance = true;
    };

    unsubscribeFromBalance = () => {
        this.state.balance = false;
    };

// subscribeToOpenContract = contractId => {
//     state.portfolio.add(contractId);
// };

    subscribeToAllOpenContracts = () => {
        this.state.portfolio = true;
    };

    unsubscribeFromAllOpenContracts = () => {
        this.state.portfolio = false;
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
    };

    unsubscribeFromTicks = (symbols: string[]) => {
        symbols.forEach(this.unsubscribeFromTick);
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
}
