import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import LiveApi from '../LiveApi';
import { resetState, getState } from '../stateful';

const MockWebSocket = () => {};

describe('stateful', () => {
    let liveApi;

    beforeEach(() => {
        resetState();
        liveApi = new LiveApi({ websocket: MockWebSocket });
    });

    it('initial state is empty', () => {
        const state = getState();

        expect(state.token).to.be.empty;
        expect(state.balance).to.be.empty;
        expect(state.portfolio).to.be.empty;
        expect(state.transactions).to.be.empty;
        expect(state.ticks.size).to.be.empty;
        expect(state.proposals.size).to.be.empty;
    });

    it('after authorization token is retained', () => {
        liveApi.authorize('some token');
        const stateAfter = getState();
        expect(stateAfter.token).to.equal('some token');
    });

    it('subscribing to balance updates is remembered', () => {
        liveApi.subscribeToBalance();
        const stateAfter = getState();
        expect(stateAfter.balance).to.be.true;
    });

    it('subscribing to balance updates is remembered', () => {
        liveApi.subscribeToAllOpenContracts();
        const stateAfter = getState();
        expect(stateAfter.portfolio).to.be.true;
    });

    it('subscribing to transactions updates is remembered', () => {
        liveApi.subscribeToTransactions();
        const stateAfter = getState();
        expect(stateAfter.transactions).to.be.true;
    });

    it('subscribing to a single tick updates is remembered', () => {
        liveApi.subscribeToTick('R_50');
        const stateAfter = getState();
        expect(stateAfter.ticks.size).to.equal(1);
    });

    it('subscribing to multiple tick updates is remembered', () => {
        liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100']);
        const stateAfter = getState();
        expect(stateAfter.ticks.size).to.equal(1);
    });

    it('subscribing to contract proposals is remembered', () => {
        liveApi.subscribeToPriceForContractProposal({ param: 'value' });
        const stateAfter = getState();
        expect(stateAfter.proposals.size).to.equal(1);
    });
});
