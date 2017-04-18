import websocket from 'ws';
import LiveApi from '../LiveApi';

describe('stateful', () => {
    let liveApi;

    beforeAll(async () => {
        liveApi = new LiveApi({ websocket, appId: 1089 });
        await liveApi.ping();
    });

    beforeEach(() => {
        liveApi.apiState.resetState();
    });

    it('initial state is empty', () => {
        const state = liveApi.apiState.getState();

        expect(state.token).toBeFalsy();
        expect(state.balance).toBeFalsy();
        expect(state.allContract).toBeFalsy();
        expect(state.transactions).toBe(false);
        expect(state.ticks.size).toBeFalsy();
        expect(state.proposals.size).toBeFalsy();
    });

    it('after authorization token is retained', () => {
        liveApi.authorize('some token');
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.token).toEqual('some token');
    });

    it('subscribing to balance updates is remembered', () => {
        liveApi.subscribeToBalance();
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.balance).toBeTruthy();
    });

    it('subscribing to balance updates is remembered', () => {
        liveApi.subscribeToAllOpenContracts();
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.allContract).toBeTruthy();
    });

    it('subscribing to transactions updates is remembered', () => {
        liveApi.subscribeToTransactions();
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.transactions).toBeTruthy();
    });

    it('subscribing to a single tick updates is remembered', () => {
        liveApi.subscribeToTick('R_50');
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.ticks.size).toEqual(1);
    });

    // unsubscribeFromTick is not really working, we should consider remove it
    it.skip('unsubsribing from a tick is remembered', () => {
        liveApi.subscribeToTick('R_50');
        liveApi.unsubscribeFromTick('R_50');
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.ticks.size).toEqual(0);
    });

    it('subscribing to multiple tick updates is remembered', () => {
        liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100']);
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.ticks.has('R_25')).toBeTruthy();
        expect(stateAfter.ticks.has('R_50')).toBeTruthy();
        expect(stateAfter.ticks.has('R_100')).toBeTruthy();
    });

    // unsubscribeFromTicks is not really working, we should consider remove it
    it.skip('unsubscribing from multiple tick updates is remembered', () => {
        liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100']);
        liveApi.unsubscribeFromTicks(['R_50', 'R_100']);
        const stateAfter = liveApi.apiState.getState();
        expect(stateAfter.ticks.has('R_25')).toBeTruthy();
        expect(stateAfter.ticks.has('R_50')).toBeFalsy();
        expect(stateAfter.ticks.has('R_100')).toBeFalsy();
    });

    it('subscribe ticks thru tickhistory should be remembered', () => {
        liveApi.getTickHistory('R_100', { subscribe: 1 });
        const stateAfter = liveApi.apiState.getState();

        expect(stateAfter.ticksHistory.has('R_100')).toBeTruthy();
        expect(stateAfter.candlesHistory.has('R_100')).toBeFalsy();
    });

    it('subscribe candles thru tickhistory should be remembered', () => {
        liveApi.getTickHistory('R_100', { subscribe: 1, style: 'candles' });
        const stateAfter = liveApi.apiState.getState();

        expect(stateAfter.ticksHistory.has('R_100')).toBeFalsy();
        expect(stateAfter.candlesHistory.has('R_100')).toBeTruthy();
    });

    // skipped as it only works for live contract, and there aint so many forever live contract for testing
    it.skip('subscribe to single contract is remembered only if contract id is valid', async () => {
        await liveApi.authorize('qdJ86Avvrsh0Le4');
        await liveApi.subscribeToOpenContract('9939813188');
        const stateAfter = liveApi.apiState.getState();

        expect(stateAfter.contracts.size).toEqual(1);
    });

    it('unsubscribeById should remove corresponding id', async () => {
        await liveApi
            .subscribeToPriceForContractProposal({
                amount       : 100,
                basis        : 'payout',
                contract_type: 'CALL',
                currency     : 'USD',
                duration     : 60,
                duration_unit: 's',
                symbol       : 'R_100',
            })
            .then(r => {
                const id = r.proposal.id;

                const stateBefore = liveApi.apiState.getState();
                expect(stateBefore.proposals.size).toEqual(1);
                liveApi.unsubscribeByID(id);

                const stateAfter = liveApi.apiState.getState();
                expect(stateAfter.proposals.size).toEqual(0);
            });
    });
});
