export default class LiveSubscriptions {

    constructor() {
        this.ticks = {};
        this.proposals = {};
    }

    resubscribe() {
        //
    }
}

const state = {};

export const authorize = token => {
    state.token = token;
};
