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

    it('can sell expired contracts', () => {
        expect(() =>
            liveApi.sellExpiredContracts()
        ).to.not.throw();
    });

    it('can topup virtual account', () => {
        expect(() =>
            liveApi.topUpVirtualAccount()
        ).to.not.throw();
    });
});
