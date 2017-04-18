import websocket from 'ws';
import LiveApi from '../LiveApi';

describe('trade', () => {
  let liveApi;

  beforeEach(() => {
    liveApi = new LiveApi({ websocket, appId: 1089 });
  });

  it('can buy contract', () => {
    expect(() => liveApi.buyContract('someid', 100)).not.toThrow();
  });

  it('can buy contract with parameters', () => {
    const parameters = {
      amount: 100,
      basis: 'payout', // or 'stake'
      contract_type: 'PUT', // or 'CALL'
      currency: 'USD',
      duration: 5,
      duration_unit: 't',
      symbol: 'frxEURUSD',
    };
    expect(() => liveApi.buyContract(parameters, 100)).not.toThrow();
  });

  it('can sell contract', () => {
    expect(() => liveApi.sellContract('someid', 100)).not.toThrow();
  });

  it('can sell expired contracts', () => {
    expect(() => liveApi.sellExpiredContracts()).not.toThrow();
  });

  it('can topup virtual account', () => {
    expect(() => liveApi.topUpVirtualAccount()).not.toThrow();
  });
});
