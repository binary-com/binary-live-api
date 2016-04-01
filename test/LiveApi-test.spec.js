import describe from 'mocha.parallel';
import { expect } from 'chai';
import LiveApi from '../src/LiveApi';

describe('LiveApi', () => {
    it('can be created', () => {
        const liveApi = new LiveApi();
        expect(liveApi).to.be.ok;
    });

    it('can be connected to', () => {
        const liveApi = new LiveApi();
        expect(() =>
            liveApi.connect()
        ).to.not.throw();
    });
});
