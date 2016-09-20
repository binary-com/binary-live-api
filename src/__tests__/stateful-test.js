import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import WS from 'ws';
chai.use(chaiAsPromised);

import token from './test-token';
import LiveApi from '../LiveApi';


describe('stateful', () => {
    let liveApi;

    before(async () => {
        liveApi = new LiveApi({ websocket: WS });
        await liveApi.ping();
    });

    beforeEach(() => {
        liveApi.apiState.resetState();
    });

    it('initial state is empty', () => {
        const state = liveApi.apiState.getState();

        expect(state.token).to.be.empty;
        expect(state.balance).to.be.empty;
        expect(state.allContract).to.be.empty;
        expect(state.transactions).to.be.empty;
        expect(state.ticks.size).to.be.empty;
        expect(state.proposals.size).to.be.empty;
        expect(state.ticksHistory).to.be.empty;
        expect(state.candlesHistory).to.be.empty;
    });

    it('after authorization token is retained', () => {
        liveApi.authorize('some token');
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.token).to.equal('some token');
    });

    it('subscribing to balance updates is remembered', () => {
        liveApi.subscribeToBalance();
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.balance).to.be.true;
    });

    it('subscribing to balance updates is remembered', () => {
        liveApi.subscribeToAllOpenContracts();
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.allContract).to.be.true;
    });

    it('subscribing to transactions updates is remembered', () => {
        liveApi.subscribeToTransactions();
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.transactions).to.be.true;
    });

    it('subscribing to a single tick updates is remembered', () => {
        liveApi.subscribeToTick('R_50');
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.ticks.size).to.equal(1);
    });

    // unsubscribeFromTick is not really working, we should consider remove it
    it.skip('unsubsribing from a tick is remembered', () => {
        liveApi.subscribeToTick('R_50');
        liveApi.unsubscribeFromTick('R_50');
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.ticks.size).to.equal(0);
    });

    it('subscribing to multiple tick updates is remembered', () => {
        liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100']);
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.ticks.has('R_25')).to.be.true;
        expect(stateAfter.ticks.has('R_50')).to.be.true;
        expect(stateAfter.ticks.has('R_100')).to.be.true;
    });

    // unsubscribeFromTicks is not really working, we should consider remove it
    it.skip('unsubscribing from multiple tick updates is remembered', () => {
        liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100']);
        liveApi.unsubscribeFromTicks(['R_50', 'R_100']);
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.ticks.has('R_25')).to.be.true;
        expect(stateAfter.ticks.has('R_50')).to.be.false;
        expect(stateAfter.ticks.has('R_100')).to.be.false;
    });

    it('subscribe ticks thru tickhistory should be remembered', () => {
        liveApi.getTickHistory('R_100', { subscribe: 1 });
        const stateAfter = liveApi.apiState.getState();

        expect(stateAfter.ticksHistory.has('R_100')).to.be.true;
        expect(stateAfter.candlesHistory.has('R_100')).to.be.false;
    });

    it('subscribe candles thru tickhistory should be remembered', () => {
        liveApi.getTickHistory('R_100', { subscribe: 1, style: 'candles' });
        const stateAfter = liveApi.apiState.getState();

        expect(stateAfter.ticksHistory.has('R_100')).to.be.false;
        expect(stateAfter.candlesHistory.has('R_100')).to.be.true;
    });

    // skipped as it only works for live contract, and there aint so many forever live contract for testing
    it.skip('subscribe to single contract is remembered only if contract id is valid', async () => {
        await liveApi.authorize('qdJ86Avvrsh0Le4');
        await liveApi.subscribeToOpenContract('9939813188');
        const stateAfter = liveApi.apiState.getState();

        expect(stateAfter.contracts.size).to.equal(1);
    });

    it('unsubscribeById should remove corresponding id', async () => {
        await liveApi.subscribeToPriceForContractProposal({
            amount: 100,
            basis: 'payout',
            contract_type: 'CALL',
            currency: 'USD',
            duration: 60,
            duration_unit: 's',
            symbol: 'R_100',
        }).then(r => {
            const id = r.proposal.id;

            const stateBefore = liveApi.apiState.getState();
            expect(stateBefore.proposals.size).to.equal(1);
            liveApi.unsubscribeByID(id);

            const stateAfter = liveApi.apiState.getState();
            expect(stateAfter.proposals.size).to.equal(0);
        });
    });
});
