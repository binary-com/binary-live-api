import expect from 'expect';
import LiveApi from '../src/LiveApi';

describe('LiveApi', () => {
    it('should be able to be created', () => {
        const liveApi = new LiveApi();
        expect(liveApi).toExist();
    });

    it('should be able to be connected to', () => {
        const liveApi = new LiveApi();
        expect(() => liveApi.connect()).toNotThrow();
    });

    it('should be able to authorize with a token', () => {
        const liveApi = new LiveApi();
        expect(() => liveApi.authorize('token')).toNotThrow();
    });
});
