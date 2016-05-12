import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import 'babel-polyfill';
import LiveApi from '../LiveApi';
import ws from 'ws';

describe('custom', () => {
    let liveApi;
    const token = 'qdJ86Avvrsh0Le4';
    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    describe('getDataForContract', () => {
        it('should get more extra ticks for non-tick-contract', async () => {
            const auth = await liveApi.authorize(token);
            const ticks = await liveApi.getDataForContract('8686424368');
            expect(ticks).to.have.lengthOf(451);
        });

        it('should get exact number of ticks for tick-contract', async () => {
            const auth = await liveApi.authorize(token);
            const ticks = await liveApi.getDataForContract('8818581808');
            expect(ticks).to.have.lengthOf(8);
        });
    });

    it('getDataForSymbol', async () => {
        const auth = await liveApi.authorize(token);
        const ticks = await liveApi.getDataForSymbol('R_100');
        expect(ticks).to.have.length.above(1000);
    });
});
