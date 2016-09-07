import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'babel-polyfill';
import ws from 'ws';
import LiveApi from '../LiveApi';

chai.use(chaiAsPromised);

describe('custom', () => {
    let liveApi;
    const token = 'qdJ86Avvrsh0Le4';
    before(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    describe('getDataForContract', () => {
        it('should get more extra ticks for non-tick-contract', async () => {
            await liveApi.authorize(token);
            const nonTickContractID = '8686424368';
            const { ticks } = await liveApi
                .getDataForContract(() =>
                    liveApi.getContractInfo(nonTickContractID).then(r => r.proposal_open_contract)
                );
            expect(ticks).to.have.lengthOf(165);
        });

        it('should get exact number of ticks for tick-contract', async () => {
            await liveApi.authorize(token);
            const tickContractID = '8818581808';
            const { ticks } = await liveApi
                .getDataForContract(() => liveApi.getContractInfo(tickContractID).then(r => r.proposal_open_contract));
            expect(ticks).to.have.lengthOf(11);
        });

        it('should return candles if user request candles', async () => {
            await liveApi.authorize(token);
            const nonTickContractID = '8686424368';
            const { candles } = await liveApi
                .getDataForContract(
                    () => liveApi.getContractInfo(nonTickContractID).then(r => r.proposal_open_contract),
                    undefined,
                    'candles',
                );
            expect(candles).to.have.lengthOf(6);
            expect(candles[0]).to.have.keys('open', 'close', 'epoch', 'high', 'low');
        });

        it('should return even if contract does not have end time', async () => {
            await liveApi.authorize(token);
            const nonTickContractID = '8686424368';
            const { candles } = await liveApi
                .getDataForContract(
                    () => liveApi.getContractInfo(nonTickContractID).then(r => {
                        const cloned = Object.assign({}, r.proposal_open_contract);
                        delete cloned.exit_tick_time;
                        delete cloned.date_expiry;
                        return cloned;
                    }),
                    undefined,
                    'candles',
                );
            expect(candles).to.have.length.below(700);
            expect(candles[0]).to.have.keys('open', 'close', 'epoch', 'high', 'low');
        });

        it('should return isSold == true if contract sold', async () => {
            await liveApi.authorize(token);
            const tickContractID = '8818581808';
            const { isSold } = await liveApi.getDataForContract(() =>
                liveApi.getContractInfo(tickContractID).then(r => r.proposal_open_contract)
            );
            expect(isSold).to.be.true;
        });
    });

    describe('getDataForSymbol', () => {
        it('should get data for specified market', async () => {
            await liveApi.authorize(token);
            const { ticks } = await liveApi.getDataForSymbol('R_100');
            expect(ticks).to.have.length.below(700);
        });

        it('should get data for specified market using given duration params', async () => {
            await liveApi.authorize(token);
            const { ticks } = await liveApi.getDataForSymbol('R_100');
            expect(ticks).to.have.length.above(29);
        });

        it('should get candles for specified market if requested candles', async () => {
            await liveApi.authorize(token);
            const { candles } = await liveApi.getDataForSymbol('R_100', 60 * 60, 'candles');
            expect(candles).to.have.length.above(59);
        });
    });
});
