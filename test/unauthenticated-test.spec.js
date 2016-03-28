import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import LiveApi from '../src/LiveApi';
import ws from 'ws';

describe('unauthenticated', () => {
    let liveApi;

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    it('can ping server', () =>
        expect(
            liveApi.ping()
        ).to.eventually.have.property('ping')
    );

    it('can call authorize', () =>
        expect(liveApi.authorize).to.be.ok
    );

    it('can not authorize with an invalid token', () =>
        expect(
            liveApi.authorize('invalid_token')
        ).to.eventually.be.rejected
    );

    it('can get all active symbols', () =>
        expect(
            liveApi.getActiveSymbolsFull()
        ).to.eventually.have.property('active_symbols')
    );

    it('can get asset index', () =>
        expect(
            liveApi.getAssetIndex()
        ).to.eventually.have.property('asset_index')
    );

    it('must provide a parameter to getTradingTimes', () =>
        expect(
            liveApi.getTradingTimes(new Date())
        ).to.eventually.have.property('trading_times')
    );

    it('can get trading times', () =>
        expect(
            liveApi.getTradingTimes(new Date())
        ).to.eventually.have.property('trading_times')
    );

    it('can subscribe to tick updates', () =>
        expect(
            liveApi.subscribeToTick('R_100')
        ).to.eventually.have.property('tick')
    );

    it('can get tick history with no parameters', () =>
        expect(
            liveApi.getTickHistory('R_100')
        ).to.eventually.have.property('history')
    );

    it('can get tick history with custom intervals', () =>
        expect(
            liveApi.getTickHistory('R_100', { end: 'latest', count: 10 })
        ).to.eventually.have.property('history')
    );

    it('can get price proposal for contract', () =>
        expect(
            liveApi.getPriceProposalForContract({
                amount: 100,
                basis: 'payout',
                contract_type: 'CALL',
                currency: 'USD',
                duration: 60,
                duration_unit: 's',
                symbol: 'R_100',
            })
        ).to.eventually.have.property('proposal')
    );

    it('can subscribe to price proposal updates for contract', () =>
        expect(
            liveApi.subscribeToPriceForContractProposal({
                amount: 100,
                basis: 'payout',
                contract_type: 'CALL',
                currency: 'USD',
                duration: 60,
                duration_unit: 's',
                symbol: 'R_100',
            })
        ).to.eventually.have.property('proposal')
    );
});
