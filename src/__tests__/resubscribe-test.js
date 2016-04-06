import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import LiveApi from '../LiveApi';
import ws from 'ws';


describe('resubscribe', () => {
    let liveApi;

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

	it('todo', () => {
		// disconnect, check if resubscribe is called
        expect(true).to.equal(true);
	});

    // check if empty state, and no resubsription when new
    // check for specific resubsriptions
});
