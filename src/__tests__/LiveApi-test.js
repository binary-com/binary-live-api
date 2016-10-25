import ws from 'ws';
import LiveApi from '../LiveApi';

describe('LiveApi', () => {
    let liveApi;

    beforeAll(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    it('can be created', () => {
        expect(liveApi).toBeDefined();
    });

    it('can be connected to', () => {
        expect(() =>
            liveApi.connect()
        ).not.toThrow();
    });

    it('can change language', () => {
        expect(() =>
            liveApi.changeLanguage()
        ).not.toThrow();
    });

    it('using api calls returns a Promise', () => {
        const response = liveApi.ping();
        expect(typeof response.then).toBe('function');
    });

    it('can send raw json', async () => {
        expect(() =>
            liveApi.sendRaw({ ping: 1 })
        ).not.toThrow();
    });

    it('sending raw json does not produce a Promise', () => {
        const response = liveApi.sendRaw({ ping: 1 });
        expect(response).toBeUndefined();
    });
});
