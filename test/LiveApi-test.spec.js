import { expect } from 'chai';
import LiveApi from '../src/LiveApi';

describe('LiveApi', () => {
    it('should be able to be created', () => {
        const liveApi = new LiveApi();
        expect(liveApi).to.be.ok;
    });

    it('should be able to be connected to', () => {
        const liveApi = new LiveApi();
        expect(() => liveApi.connect()).to.not.throw();
    });

    it('should be able to authorize with a token', () => {
        const liveApi = new LiveApi();
        expect(() => liveApi.authorize('token')).to.not.throw();
    });
});
