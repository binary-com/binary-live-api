import websocket from 'ws';
import LiveApi from '../LiveApi';

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

describe('resubscribe', () => {
  it('should reconnect when disconnected', async () => {
    const api = new LiveApi({ websocket, appId: 1089 });

    await api.ping();

    try {
      api.socket.close();
    } catch (e) {
      // ignore error
    }

    await sleep(2000);

    const response = await api.ping();
    expect(response.ping).toBeTruthy();
  });

  it.skip('should resubscribe all subscription after reconnect', async () => {
    const spy = jest.fn();
    const api = new LiveApi({ websocket, appId: 1089 });

    await api.ping();

    api.events.on('tick', spy);

    const ticks = ['R_100'];
    api.subscribeToTicks(ticks);

    try {
      api.socket.close();
    } catch (e) {
      // ignore error
    }

    await sleep(2000);

    expect(api.apiState.getState().ticks.has('R_100')).toEqual(true);
    expect(spy).toHaveBeenCalled();
  });

  // check if empty state, and no resubsription when new
  // check for specific resubsriptions

  it('should reject promise with DisconnectError when socket disconnected before response received', async () => {
    const api = new LiveApi({ websocket, appId: 1089 });

    await sleep(2000);

    const promise = api.ping();

    try {
      api.socket.close();
    } catch (e) {
      // ignore error
    }

    return promise.catch(err => expect(err.name).toEqual('DisconnectError'));
  });
});
