import { expect } from 'chai';
import LiveApi from '../src/LiveApi';

describe('trade', () => {
    let liveApi;

    beforeEach(() => {
        liveApi = new LiveApi();
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
