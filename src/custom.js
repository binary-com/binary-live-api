import nowEpoch from 'binary-utils/lib/nowAsEpoch';
import durationToSecs from 'binary-utils/lib/durationToSecs';

const granularities = [60, 120, 180, 300, 600, 900, 1800, 3600, 7200, 14400, 28800, 86400];
const ohlcDataToTicks = candles => candles.map(data => ({ quote: +data.open, epoch: +data.epoch }));
const hcUnitConverter = type => {
    switch (type) {
        case 'second': return 's';
        case 'minute': return 'm';
        case 'hour': return 'h';
        case 'day': return 'd';
        default: return 'd';
    }
};

const autoAdjustGetData = (api, symbol, start, end, style = 'ticks', granularity = 60) => {
    const secs = end - start;
    const ticksCount = secs / 2;
    if (ticksCount >= 5000 || style === 'candles') {
        const idealGranularity = secs / 4999;
        granularities.forEach((g, i) => {
            if (idealGranularity > g && idealGranularity <= granularities[i + 1]) {
                granularity = granularities[i + 1];
            }
        });
        granularity = Math.min(86400, granularity);
        return api.getTickHistory(symbol,
            {
                start,
                end,
                adjust_start_time: 1,
                count: 4999,
                style: 'candles',
                granularity,
            }
        ).then(r => style === 'ticks' ? ohlcDataToTicks(r.candles) : r.candles);
    }
    return api.getTickHistory(symbol,
        {
            start,
            end,
            adjust_start_time: 1,
            count: 4999,
            style: 'ticks',
        }
    ).then(r => {
        const ticks = r.history.times.map((t, idx) => {
            const quote = r.history.prices[idx];
            return { epoch: +t, quote: +quote };
        });
        return ticks;
    });
};

/**
 *
 * @param api
 * @param symbol
 * @param durationCount
 * @param durationType
 */
export function getDataForSymbol(api, symbol, durationCount = 1, durationType = 'all', style = 'ticks') {
    const durationUnit = hcUnitConverter(durationType);
    const end = nowEpoch();
    const start = end - durationToSecs(durationCount, durationUnit);
    return autoAdjustGetData(api, symbol, start, end, style);
}

/**
 * get data of contract
 * @param api                      - will be injected by library
 * @param getContract              - function that accept nothing and return a Promise containing contract
 * @param durationCount            - number of duration
 * @param durationType             - type of duration, check http://api.highcharts.com/highstock#rangeSelector.buttons
 * @param style                    - one of ['ticks', 'candles'], this will affect the return data shape,
 *                                   internally library might not always use this param when requesting, eg. when data is too large,
 *                                   library will use `candles` instead of `ticks`, this is handle by library so user do not need to worry
 * @param granularity              - default to 60, check https://developers.binary.com/api/#ticks_history
 * @returns {*|Promise.<TResult>}
 */
export function getDataForContract(
    api,
    getContract,
    durationCount,
    durationType = 'all',
    style = 'ticks',
    granularity = 60,
) {
    const getAllData = () =>
        getContract()
            .then(contract => {
                const symbol = contract.underlying;
                if (contract.tick_count) {
                    const start = contract.purchase_time;
                    const sellT = contract.sell_time;
                    const end = contract.sell_spot ? sellT : nowEpoch();
                    return autoAdjustGetData(api, symbol, start, end, style, granularity);
                }

                const start = contract.purchase_time - (5 * 60);    // add 5 minutes buffer
                const sellT = contract.sell_time + (5 * 60);
                const end = contract.sell_spot ? sellT : nowEpoch();
                return autoAdjustGetData(api, symbol, start, end, style, granularity);
            });

    if (durationType === 'all') {
        return getAllData();
    }

    return getContract()
        .then(r => {
            const contract = r.proposal_open_contract;
            const symbol = contract.underlying;
            const purchaseT = contract.purchase_time;
            const sellT = contract.sell_time;
            const end = contract.sell_spot ? sellT : nowEpoch();
            const durationUnit = hcUnitConverter(durationType);
            const start = Math.min(purchaseT, end - durationToSecs(durationCount, durationUnit));
            return autoAdjustGetData(api, symbol, start, end, style, granularity);
        });
}
