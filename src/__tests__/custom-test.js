import websocket from 'ws';
import LiveApi from '../LiveApi';

describe('custom', () => {
  let liveApi;
  const token = 'qdJ86Avvrsh0Le4';
  beforeAll(() => {
    liveApi = new LiveApi({ websocket, appId: 1089 });
  });

  describe('getDataForContract', () => {
    it('should get more extra ticks for non-tick-contract', async () => {
      await liveApi.authorize(token);
      const nonTickContractID = '8686424368';
      const { ticks } = await liveApi.getDataForContract(() =>
        liveApi
          .getContractInfo(nonTickContractID)
          .then(r => r.proposal_open_contract),
      );
      expect(ticks.length).toBe(165);
    });

    it('should get exact number of ticks for tick-contract', async () => {
      await liveApi.authorize(token);
      const tickContractID = '8818581808';
      const { ticks } = await liveApi.getDataForContract(() =>
        liveApi
          .getContractInfo(tickContractID)
          .then(r => r.proposal_open_contract),
      );
      expect(ticks.length).toBe(11);
    });

    it('should return candles if user request candles', async () => {
      await liveApi.authorize(token);
      const nonTickContractID = '8686424368';
      const { candles } = await liveApi.getDataForContract(
        () =>
          liveApi
            .getContractInfo(nonTickContractID)
            .then(r => r.proposal_open_contract),
        undefined,
        'candles',
      );
      expect(candles.length).toBe(6);
      expect(candles[0].open).toBeTruthy();
      expect(candles[0].close).toBeTruthy();
      expect(candles[0].epoch).toBeTruthy();
      expect(candles[0].high).toBeTruthy();
      expect(candles[0].low).toBeTruthy();
    });

    it('should return even if contract does not have end time', async () => {
      await liveApi.authorize(token);
      const nonTickContractID = '8686424368';
      const { candles } = await liveApi.getDataForContract(
        () =>
          liveApi.getContractInfo(nonTickContractID).then(r => {
            const cloned = Object.assign({}, r.proposal_open_contract);
            delete cloned.exit_tick_time;
            delete cloned.date_expiry;
            return cloned;
          }),
        undefined,
        'candles',
      );
      expect(candles.length).toBeLessThan(700);
      expect(candles[0].open).toBeTruthy();
      expect(candles[0].close).toBeTruthy();
      expect(candles[0].epoch).toBeTruthy();
      expect(candles[0].high).toBeTruthy();
      expect(candles[0].low).toBeTruthy();
    });

    it('should return isSold == true if contract sold', async () => {
      await liveApi.authorize(token);
      const tickContractID = '8818581808';
      const { isSold } = await liveApi.getDataForContract(() =>
        liveApi
          .getContractInfo(tickContractID)
          .then(r => r.proposal_open_contract),
      );
      expect(isSold).toBeTruthy();
    });
  });

  describe('getDataForSymbol', () => {
    it('should get data for specified market', async () => {
      await liveApi.authorize(token);
      const { ticks } = await liveApi.getDataForSymbol('R_100');
      expect(ticks.length).toBeLessThan(700);
    });

    it('should get data for specified market using given duration params', async () => {
      await liveApi.authorize(token);
      const { ticks } = await liveApi.getDataForSymbol('R_100');
      expect(ticks.length).toBeGreaterThan(29);
    });

    it('should get candles for specified market if requested candles', async () => {
      await liveApi.authorize(token);
      const { candles } = await liveApi.getDataForSymbol(
        'R_100',
        60 * 60,
        'candles',
      );
      expect(candles.length).toBeGreaterThan(59);
    });
  });
});
