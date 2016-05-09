import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import 'babel-polyfill';
import LiveApi from '../LiveApi';
import ws from 'ws';

describe("custom", () => {
    let liveApi;
    const token = 'qdJ86Avvrsh0Le4';
    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    it("getDataForContract", async () => {
        const auth = await liveApi.authorize(token);
        const ticks = await liveApi.getDataForContract('8686424368');
        expect(ticks).to.have.lengthOf(151);
    });

    it('getDataForSymbol', async () => {
        const auth = await liveApi.authorize(token);
        const ticks = await liveApi.getDataForSymbol('R_100');
        expect(ticks).to.have.length.above(1000);
    });
});
