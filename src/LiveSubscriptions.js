const getInitialState = () => ({
    token: '',
    balance: true,
    portfolio: false,
    transactions: false,
    ticks: new Set(),
    proposals: new Set(),
});

export default class LiveSubscriptions {

    constructor() {
        this.state = getInitialState();
    }

    resubscribe() {
        const { token, portfolio, ticks, proposals } = this.state;

        if (token) {
            this.authorize(token);
        }

        if (portfolio) {
            this.subscribeToAllOpenContracts();
        }

        this.subscribeToTicks(Object.keys(ticks));

        if (proposals) {
            proposals.forEach(proposal =>
                this.subscribeToPriceForContractProposal(proposal)
            );
        }
    }
}

let state = {};

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
    state.ticks.add(...symbols);
};

export const unsubscribeFromTick = symbol => {
    state.ticks.delete(symbol);
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
