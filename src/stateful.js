const getInitialState = () => ({
    token: '',
    balance: false,
    portfolio: false,
    transactions: false,
    ticks: new Set(),
    proposals: new Set(),
});

let state = getInitialState();

export const resetState = () => {
    state = getInitialState();
};

export const getState = () => state;

export const authorize = token => {
    state.token = token;
};

export const subscribeToBalance = () => {
    state.balance = true;
};

export const unsubscribeFromBalance = () => {
    state.balance = false;
};

// export const subscribeToOpenContract = contractId => {
//     state.portfolio.add(contractId);
// };

export const subscribeToAllOpenContracts = () => {
    state.portfolio = true;
};

export const unsubscribeFromAllOpenContracts = () => {
    state.portfolio = false;
};

export const subscribeToTransactions = () => {
    state.transactions = true;
};

export const unsubscribeFromTransactions = () => {
    state.transactions = false;
};

export const subscribeToTick = symbol => {
    state.ticks.add(symbol);
};

export const subscribeToTicks = symbols => {
    symbols.forEach(subscribeToTick);
};

export const unsubscribeFromTick = symbol => {
    state.ticks.delete(symbol);
};

export const unsubscribeFromTicks = symbols => {
    symbols.forEach(unsubscribeFromTick);
};

export const unsubscribeFromAllTicks = () => {
    state.ticks.clear();
};

export const subscribeToPriceForContractProposal = options => {
    state.proposals.add(options);
};

export const unsubscribeFromAllProposals = () => {
    state.proposals.clear();
};
