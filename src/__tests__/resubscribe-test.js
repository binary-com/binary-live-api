import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import spies from 'chai-spies';
chai.use(spies);
chai.use(chaiAsPromised);

import LiveApi from '../LiveApi';
import * as stateful from '../stateful';
import WS from 'ws';


describe('resubscribe', () => {
    let connection;
    let api;
    beforeEach(() => {
        connection = new WS('wss://ws.binaryws.com/websockets/v3');
        api = new LiveApi({ connection, websocket: WS });
    });

    afterEach(() => {
        api.disconnect();
    });

    it('should reconnect when disconnected', done => {

        connection.close();
        setTimeout(() => {
            expect(api.ping()).to.eventually.have.property('ping');
            done();
        }, 3000);
    });

    it('should resubscribe all subscription after reconnect', done => {

        const api = new LiveApi({ connection });

        const spy = chai.spy();
        api.events.on('tick', spy);

        const ticks = ['R_100'];
        api.subscribeToTicks(ticks);

        connection.close();

        setTimeout(() => {
            expect(stateful.getState().ticks.has('R_100')).to.equal(true);
            expect(spy).to.have.been.called();
            done();
        }, 5000);
    });

    // check if empty state, and no resubsription when new
    // check for specific resubsriptions
});
