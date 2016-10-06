import { nowAsEpoch, computeStartEndForContract } from 'binary-utils';

const responseSizeLimit = 700;

const granularities: number[] = [60, 120, 180, 300, 600, 900, 1800, 3600, 7200, 14400, 28800, 86400];

const ohlcDataToTicks = (candles: Candle[]): Tick[] =>
    candles.map(data => ({ quote: +data.open, epoch: +data.epoch }));

export const autoAdjustGetData = (
    api: LiveApi,
    symbol: string,
    start: Epoch,
    end: Epoch,
    style: string = 'ticks',
    subscribe: boolean,
    extra = {},
) => {
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
        ).then(r => {
            if (style === 'ticks') {
                return {
                    ...extra,
                    ticks: ohlcDataToTicks(r.candles),
                    symbol,
                };
            }
            return {
                ...extra,
                candles: r.candles,
                symbol,
            };
        });
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
        return {
            ...extra,
            ticks,
            symbol,
        };
    });
};

export function getDataForSymbol(
        api: LiveApi,
        symbol: string,
        duration: Epoch = 600,
        style: string = 'ticks',
        subscribe: boolean,
) {
    const end = nowAsEpoch();
    const start = end - duration;
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
    api: LiveApi,
    getContract,
    duration?: Epoch,
    style: string = 'ticks',
    subscribe: boolean,
) {
    const getAllData = () =>
        getContract()
            .then(contract => {
                const symbol = contract.underlying;
                const { start, end } = computeStartEndForContract(contract);
                return autoAdjustGetData(api, symbol, start, end, style, subscribe, { isSold: !!contract.sell_time });
            });

    if (!duration) {
        return getAllData();
    }

    return getContract()
        .then(contract => {
            const symbol = contract.underlying;
            const startTime = +(contract.date_start);

            // handle Contract not started yet
            if (startTime > nowAsEpoch()) {
                return autoAdjustGetData(
                    api,
                    symbol,
                    nowAsEpoch() - 600,
                    nowAsEpoch(),
                    style,
                    subscribe,
                    { isSold: !!contract.sell_time },
                );
            }

            const sellT = contract.sell_time;
            const end = sellT || nowAsEpoch();

            const buffer = (end - startTime) * 0.05;

            const start = Math.min(startTime - buffer, end - duration);
            return autoAdjustGetData(
                api,
                symbol,
                Math.round(start),
                Math.round(end),
                style,
                subscribe,
                { isSold: !!contract.sell_time },
            );
        });
}

export const helpers = {
    autoAdjustGetData,
};
