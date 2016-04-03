import describe from 'mocha.parallel';
import { expect } from 'chai';
import LiveApi from '../LiveApi';
import ws from 'ws';

describe('trade', () => {
    let liveApi;

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    it('can buy contract', () => {
        expect(() =>
            liveApi.buyContract('someid', 100)
        ).to.not.throw();
    });

    it('can sell contract', () => {
        expect(() =>
            liveApi.sellContract('someid', 100)
        ).to.not.throw();
    });
});
