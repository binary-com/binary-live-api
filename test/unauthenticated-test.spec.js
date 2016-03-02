import { expect } from 'chai';
import LiveApi from '../src/LiveApi';

describe('unauthenticated', () => {
    let liveApi;

    beforeEach(() => {
        liveApi = new LiveApi();
    });

    it('can authorize with a token', () => {
        expect(() =>
            liveApi.authorize('token')
        ).to.not.throw();
    });

    it('can get all active symbols', () => {
        expect(() =>
            liveApi.getActiveSymbolsFull()
        ).to.not.throw();
    });

    it('can get asset index', () => {
        expect(() =>
            liveApi.getAssetIndex()
        ).to.not.throw();
    });

    it('can get trading times', () => {
        expect(() =>
            liveApi.getTradingTimes(new Date())
        ).to.not.throw();
    });

    it('must provide a parameter to getTradingTimes', () => {
        expect(() =>
            liveApi.getTradingTimes()
        ).to.throw();
    });

    it('can subscribe to tick updates', () => {
        expect(() =>
            liveApi.subscribeToTick('R_100')
        ).to.not.throw();
    });

    it('can get tick history with no parameters', () => {
        expect(() =>
            liveApi.getTickHistory('R_100')
        ).to.not.throw();
    });

    it('can get tick history with custom intervals', () => {
        expect(() =>
            liveApi.getTickHistory('R_100', { end: 'latest', count: 10 })
        ).to.not.throw();
    });

    it('can get price proposal for contract', () => {
        expect(() =>
            liveApi.getPriceProposalForContract()
        ).to.not.throw();
    });

    it('can subscribe to price proposal updates for contract', () => {
        expect(() =>
            liveApi.subscribeToPriceForContractProposal()
        ).to.not.throw();
    });
});
