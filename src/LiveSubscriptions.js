const getInitialState = () => ({
    ticks: {},
    proposals: {},
});

export default class LiveSubscriptions {

    constructor() {
        this.state = getInitialState();
    }

    resubscribe() {
        //
    }
}

let state = {};

export const authorize = token => {
    state.token = token;
};

export const unsubscribeFromTick = symbol => {
    delete state.ticks[symbol];
};

export const unsubscribeFromAllTicks = () => {
    state.ticks = {};
};

export const unsubscribeFromAllProposals = () => {
    state.priceProposal = null;
};

export const unsubscribeFromAllPortfolios = () => {
    state.portfolio = false;
};

export const unsubscribeFromAlProposals = () => {
    state = getInitialState();
};

export const subscribeToTick = symbol => {
    state.ticks[symbol] = true;
};

export const subscribeToTicks = symbols => {
    symbols.forEach(s => { state.ticks[s] = true; });
};
