import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ws from 'ws';
import LiveApi from '../LiveApi';


chai.use(chaiAsPromised);

describe('unauthenticated', () => {
    let liveApi;

    before(() => {
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

    it('can get available contracts for symbol', () =>
        expect(
            liveApi.getContractsForSymbol('R_100')
        ).to.eventually.have.property('contracts_for')
    );

    it('can get brief active symbols', () =>
        expect(
            liveApi.getActiveSymbolsBrief()
        ).to.eventually.have.property('active_symbols')
    );

    it('can get full active symbols', () =>
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

    it('can get residences', () =>
        expect(
            liveApi.getResidences()
        ).to.eventually.have.property('residence_list')
    );

    it('can get states for a country', () =>
        expect(
            liveApi.getStatesForCountry('de')
        ).to.eventually.have.property('states_list')
    );

    it('can subscribe to tick updates', () =>
        expect(
            liveApi.subscribeToTick('R_100')
        ).to.eventually.have.property('tick')
    );

    it('can subscribe to multiple ticks updates', () =>
        expect(
            liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100'])
        ).to.not.throw
    );

    it('can unsubscribe from all tick updates', () =>
        expect(
            liveApi.unsubscribeFromAllTicks()
        ).to.not.throw
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

    it('can get the landing company for a country', () =>
        expect(
            liveApi.getLandingCompany('de')
        ).to.eventually.have.property('landing_company')
    );

    it('can get details about a landing company', () =>
        expect(
            liveApi.getLandingCompanyDetails('costarica')
        ).to.eventually.have.property('landing_company_details')
    );

    it('can get payment agents for a country', () =>
        expect(
            liveApi.getPaymentAgentsForCountry('id')
        ).to.eventually.have.property('paymentagent_list')
    );

    it('can get payout currencies', () =>
        expect(
            liveApi.getPayoutCurrencies()
        ).to.eventually.have.property('payout_currencies')
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

    it('can unsubscribe from all price proposal updates', () =>
        expect(
            liveApi.unsubscribeFromAllProposals()
        ).to.not.throw
    );

    it('can get candles for a symbol', () =>
        expect(
            liveApi.getCandles('R_50')
        ).to.eventually.have.property('candles')
    );

    it('can get candles for last N days', () =>
        expect(
            liveApi.getCandlesForLastNDays('R_50', 40)
        ).to.eventually.have.property('candles')
    );

    it('can get server time', () =>
        expect(
            liveApi.getServerTime()
        ).to.eventually.have.property('time')
    );

    it('can verify email', () =>
        expect(
            liveApi.verifyEmail('address@example.com', 'account_opening')
        ).to.eventually.have.property('verify_email')
    );

    it('can get website status', () =>
        expect(
            liveApi.getWebsiteStatus()
        ).to.eventually.have.property('website_status')
    );
});
