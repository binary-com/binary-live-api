import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import LiveApi from '../LiveApi';
import ws from 'ws';

describe("custom", () => {
    let liveApi;
    const token = 'qdJ86Avvrsh0Le4';
    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    it("getDataForContract", async () => {
        const auth = await liveApi.authorize();
        const ticks = await liveApi.getDataForContract('8686424368');
        expect(ticks).length.to.equal(10);
    });
});
