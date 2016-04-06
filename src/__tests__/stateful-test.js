import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import LiveApi from '../LiveApi';

const MockWebSocket = () => {};

describe('stateful', () => {
    let liveApi;

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: MockWebSocket });
    });

    // it('can ping server', () =>
    //     expect(
    //         liveApi.ping()
    //     ).to.eventually.have.property('ping')
    // );
});
