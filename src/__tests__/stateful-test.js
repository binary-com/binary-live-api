import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import WS from 'ws';
chai.use(chaiAsPromised);

import LiveApi from '../LiveApi';
import { resetState, getState } from '../stateful';


describe('stateful', () => {
    let liveApi;

    before(done => {
        resetState();
        liveApi = new LiveApi({ websocket: WS });
        liveApi.socket.onopen = () => {
            liveApi.onOpen();
            done();                         // make sure api is open before proceed
        }
    });

    after(() => {
        liveApi.disconnect();
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

    it('unsubsribing from a tick is remembered', () => {
        liveApi.subscribeToTick('R_50');
        liveApi.unsubscribeFromTick('R_50');
        const stateAfter = getState();
        expect(stateAfter.ticks.size).to.equal(0);
    });

    it('subscribing to multiple tick updates is remembered', () => {
        liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100']);
        const stateAfter = getState();
        expect(stateAfter.ticks.has('R_25')).to.be.true;
        expect(stateAfter.ticks.has('R_50')).to.be.true;
        expect(stateAfter.ticks.has('R_100')).to.be.true;
    });

    it('unsubscribing from multiple tick updates is remembered', () => {
        liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100']);
        liveApi.unsubscribeFromTicks(['R_50', 'R_100']);
        const stateAfter = getState();
        expect(stateAfter.ticks.has('R_25')).to.be.true;
        expect(stateAfter.ticks.has('R_50')).to.be.false;
        expect(stateAfter.ticks.has('R_100')).to.be.false;
    });
});
