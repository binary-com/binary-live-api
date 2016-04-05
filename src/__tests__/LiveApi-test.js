import describe from 'mocha.parallel';
import { expect } from 'chai';
import ws from 'ws';
import LiveApi from '../LiveApi';

describe('LiveApi', () => {
    let liveApi;

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    it('can be created', () => {
        expect(liveApi).to.be.ok;
    });

    it('can be connected to', () => {
        expect(() =>
            liveApi.connect()
        ).to.not.throw();
    });

    it('can change language', () => {
        expect(() =>
            liveApi.changeLanguage()
        ).to.not.throw();
    });
});
