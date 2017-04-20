import websocket from 'ws';
import LiveApi from '../LiveApi';

describe('unauthenticated', () => {
    let liveApi;

    beforeAll(() => {
        liveApi = new LiveApi({ websocket, appId: 1089 });
    });

    it('can ping server', async () => expect((await liveApi.ping()).ping).toBeTruthy());

    it('can call authorize', () => expect(liveApi.authorize).toBeTruthy());

    it('can get available contracts for symbol', async () =>
        expect((await liveApi.getContractsForSymbol('R_100')).contracts_for).toBeTruthy());

    it('can get brief active symbols', async () =>
        expect((await liveApi.getActiveSymbolsBrief()).active_symbols).toBeTruthy());

    it('can get full active symbols', async () =>
        expect((await liveApi.getActiveSymbolsFull()).active_symbols).toBeTruthy());

    it('can get asset index', async () => expect((await liveApi.getAssetIndex()).asset_index).toBeTruthy());

    it('must provide a parameter to getTradingTimes', async () =>
        expect((await liveApi.getTradingTimes(new Date())).trading_times).toBeTruthy());

    it('can get trading times', async () =>
        expect((await liveApi.getTradingTimes(new Date())).trading_times).toBeTruthy());

    it('can get residences', async () => expect((await liveApi.getResidences()).residence_list).toBeTruthy());

    it('can get states for a country', async () =>
        expect((await liveApi.getStatesForCountry('de')).states_list).toBeTruthy());

    it('can subscribe to tick updates', async () => expect((await liveApi.subscribeToTick('R_100')).tick).toBeTruthy());

    it('can subscribe to multiple ticks updates', async () =>
        expect(() => liveApi.subscribeToTicks(['R_25', 'R_50', 'R_100'])).not.toThrow());

    it('can unsubscribe from all tick updates', async () =>
        expect(() => liveApi.unsubscribeFromAllTicks()).not.toThrow());

    it('can get tick history with no parameters', async () =>
        expect(() => liveApi.getTickHistory('R_100').history).not.toThrow());

    it('can get tick history with custom intervals', async () =>
        expect(
            async () =>
                (await liveApi.getTickHistory('R_100', {
                    end  : 'latest',
                    count: 10,
                })).history
        ).not.toThrow());

    it('can get the landing company for a country', async () =>
        expect((await liveApi.getLandingCompany('de')).landing_company).toBeTruthy());

    it('can get details about a landing company', async () =>
        expect((await liveApi.getLandingCompanyDetails('costarica')).landing_company_details).toBeTruthy());

    it('can get payment agents for a country', async () =>
        expect((await liveApi.getPaymentAgentsForCountry('id')).paymentagent_list).toBeTruthy());

    it('can get payout currencies', async () =>
        expect((await liveApi.getPayoutCurrencies()).payout_currencies).toBeTruthy());

    it('can get price proposal for contract', async () =>
        expect(
            (await liveApi.getPriceProposalForContract({
                amount       : 100,
                basis        : 'payout',
                contract_type: 'CALL',
                currency     : 'USD',
                duration     : 60,
                duration_unit: 's',
                symbol       : 'R_100',
            })).proposal
        ).toBeTruthy());

    it('can subscribe to price proposal updates for contract', async () =>
        expect(
            (await liveApi.subscribeToPriceForContractProposal({
                amount       : 100,
                basis        : 'payout',
                contract_type: 'CALL',
                currency     : 'USD',
                duration     : 60,
                duration_unit: 's',
                symbol       : 'R_100',
            })).proposal
        ).toBeTruthy());

    it('can unsubscribe from all price proposal updates', async () =>
        expect(() => liveApi.unsubscribeFromAllProposals()).not.toThrow());

    it('can get candles for a symbol', async () => expect((await liveApi.getCandles('R_50')).candles).toBeTruthy());

    it('can get candles for last N days', async () =>
        expect((await liveApi.getCandlesForLastNDays('R_50', 40)).candles).toBeTruthy());

    it('can get server time', async () => expect((await liveApi.getServerTime()).time).toBeTruthy());

    it('can verify email', async () =>
        expect((await liveApi.verifyEmail('address@example.com', 'account_opening')).verify_email).toBeTruthy());

    it('can get website status', async () => expect((await liveApi.getWebsiteStatus()).website_status).toBeTruthy());
});
