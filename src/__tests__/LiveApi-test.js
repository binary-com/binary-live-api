import websocket from 'ws';
import LiveApi from '../LiveApi';

describe('LiveApi', () => {
  let liveApi;

  beforeAll(() => {
    liveApi = new LiveApi({ websocket, appId: 1089 });
  });

  it('can be created', () => {
    expect(liveApi).toBeDefined();
  });

  it('can be connected to', () => {
    expect(() => liveApi.connect()).not.toThrow();
  });

  it('can change language', () => {
    expect(() => liveApi.changeLanguage()).not.toThrow();
  });

  it('using api calls returns a Promise', () => {
    const response = liveApi.ping();
    expect(typeof response.then).toBe('function');
  });
});
