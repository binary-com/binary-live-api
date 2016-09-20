import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import spies from 'chai-spies';
chai.use(spies);
chai.use(chaiAsPromised);

import LiveApi from '../LiveApi';
import WS from 'ws';

function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}

describe('resubscribe', () => {

    it('should reconnect when disconnected', async () => {
        const api = new LiveApi({ websocket: WS });

        await api.ping();

        api.socket.close();

        await sleep(5000);

        expect(api.ping()).to.eventually.have.property('ping');
    });

    it('should resubscribe all subscription after reconnect', async () => {
        const api = new LiveApi({ websocket: WS });

        await api.ping();

        const spy = chai.spy();
        api.events.on('tick', spy);

        const ticks = ['R_100'];
        api.subscribeToTicks(ticks);

        api.socket.close();

        await sleep(5000);
        expect(api.apiState.getState().ticks.has('R_100')).to.equal(true);
        expect(spy).to.have.been.called();
    });

    // check if empty state, and no resubsription when new
    // check for specific resubsriptions

    it('should reject promise with DisconnectError when socket disconnected before response received', () => {
        const api = new LiveApi({ websocket: WS });

        const promise = api.ping();
        api.socket.close();

        return promise.catch(err => expect(err.name).to.be.equal('DisconnectError'));
    });
});
