import nowEpoch from 'binary-utils/lib/nowAsEpoch';
import durationToSecs from 'binary-utils/lib/durationToSecs';

const responseSizeLimit = 2000;

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

const autoAdjustGetData = (api, symbol, start, end, style = 'ticks', subscribe) => {
    const secs = end - start;
    const ticksCount = secs / 2;
    if (ticksCount >= responseSizeLimit || style === 'candles') {
        const idealGranularity = secs / responseSizeLimit;
        let finalGranularity = 60;
        granularities.forEach((g, i) => {
            if (idealGranularity > g && idealGranularity <= granularities[i + 1]) {
                finalGranularity = granularities[i + 1];
            }
        });
        finalGranularity = Math.min(86400, finalGranularity);
        return api.getTickHistory(symbol,
            {
                start,
                end,
                adjust_start_time: 1,
                count: responseSizeLimit,
                style: 'candles',
                granularity: finalGranularity,
                subscribe: subscribe ? 1 : undefined,
            }
        ).then(r => style === 'ticks' ? ohlcDataToTicks(r.candles) : r.candles);
    }
    return api.getTickHistory(symbol,
        {
            start,
            end,
            adjust_start_time: 1,
            count: responseSizeLimit,
            style: 'ticks',
            subscribe: subscribe ? 1 : undefined,
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
export function getDataForSymbol(api, symbol, durationCount = 1, durationType = 'all', style = 'ticks', subscribe) {
    const durationUnit = hcUnitConverter(durationType);
    const end = nowEpoch();
    const start = end - durationToSecs(durationCount, durationUnit);
    return autoAdjustGetData(api, symbol, start, end, style, subscribe);
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
    subscribe,
) {
    const getAllData = () =>
        getContract()
            .then(contract => {
                const symbol = contract.underlying;
                if (contract.tick_count) {
                    const start = +(contract.date_start) - 5;
                    const exitTime = +(contract.exit_tick_time) + 5;
                    const end = exitTime ? exitTime : nowEpoch();
                    return autoAdjustGetData(api, symbol, start, end, style, subscribe);
                }

                const bufferSize = 0.05;                            // 5 % buffer
                const contractStart = +(contract.date_start);
                const contractEnd = +(contract.exit_tick_time) || +(contract.date_expiry);

                // handle Contract not started yet
                if (contractStart > nowEpoch()) {
                    return autoAdjustGetData(api, symbol, nowEpoch() - 600, nowEpoch(), style, subscribe);
                }

                const buffer = (contractEnd - contractStart) * bufferSize;
                const start = buffer ? contractStart - buffer : contractStart;
                const bufferedExitTime = contractEnd + buffer;
                const end = contractEnd ? bufferedExitTime : nowEpoch();

                return autoAdjustGetData(api, symbol, Math.round(start), Math.round(end), style, subscribe);
            });

    if (durationType === 'all') {
        return getAllData();
    }

    return getContract()
        .then(contract => {
            const symbol = contract.underlying;
            const startTime = +(contract.date_start);

            // handle Contract not started yet
            if (startTime > nowEpoch()) {
                return autoAdjustGetData(api, symbol, nowEpoch() - 600, nowEpoch(), style, subscribe);
            }

            const sellT = contract.sell_time;
            const end = sellT || nowEpoch();

            const buffer = (end - startTime) * 0.05;

            const durationUnit = hcUnitConverter(durationType);
            const start = Math.min(startTime - buffer, end - durationToSecs(durationCount, durationUnit));
            return autoAdjustGetData(api, symbol, Math.round(start), Math.round(end), style, subscribe);
        });
}
