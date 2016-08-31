export default () => {
    const getInitialState = () => ({
        token: '',
        balance: false,
        portfolio: false,
        transactions: false,
        ticks: new Set(),
        proposals: new Set(),
    });

    let state = getInitialState();

    const resetState = () => {
        state = getInitialState();
    };

    const getState = () => state;

    const authorize = (token: string) => {
        state.token = token;
    };

    const subscribeToBalance = () => {
        state.balance = true;
    };

    const unsubscribeFromBalance = () => {
        state.balance = false;
    };

// const subscribeToOpenContract = contractId => {
//     state.portfolio.add(contractId);
// };

    const subscribeToAllOpenContracts = () => {
        state.portfolio = true;
    };

    const unsubscribeFromAllOpenContracts = () => {
        state.portfolio = false;
    };

    const subscribeToTransactions = () => {
        state.transactions = true;
    };

    const unsubscribeFromTransactions = () => {
        state.transactions = false;
    };

    const subscribeToTick = (symbol: string) => {
        state.ticks.add(symbol);
    };

    const subscribeToTicks = (symbols: string[]) => {
        symbols.forEach(subscribeToTick);
    };

    const unsubscribeFromTick = (symbol: string) => {
        state.ticks.delete(symbol);
    };

    const unsubscribeFromTicks = (symbols: string[]) => {
        symbols.forEach(unsubscribeFromTick);
    };

    const unsubscribeFromAllTicks = () => {
        state.ticks.clear();
    };

    const subscribeToPriceForContractProposal = (options: Object) => {
        state.proposals.add(options);
    };

    const unsubscribeFromAllProposals = () => {
        state.proposals.clear();
    };
}
