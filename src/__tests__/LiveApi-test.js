import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import 'babel-polyfill';

import LiveApi from '../LiveApi';
import ws from 'ws';

describe('LiveApi', () => {
    let liveApi;


    before(() => {
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

    it('using api calls returns a Promise', () => {
        const response = liveApi.ping();
        expect(response).to.be.a('Promise');
    });

    it('can send raw json', async () => {
        expect(() =>
            liveApi.sendRaw({ ping: 1 })
        ).to.not.throw();
    });

    it('sending raw json does not produce a Promise', () => {
        const response = liveApi.sendRaw({ ping: 1 });
        expect(response).to.not.be.a('Promise');
    });
});
