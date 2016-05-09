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
    if (ticksCount >= 5000) {
        style = 'candles';
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
                style,
                granularity,
            }
        ).then(r => ohlcDataToTicks(r.candles));
    }
    return api.getTickHistory(symbol,
        {
            start,
            end,
            adjust_start_time: 1,
            count: 4999,
            style,
        }
    ).then(r => {
        const ticks = r.history.times.map((t, idx) => {
            const quote = r.history.prices[idx];
            return { epoch: +t, quote: +quote };
        });
        return ticks;
    });
};

export const getDataForSymbol = (api, symbol, durationType = 'all', durationCount = 1) => {
    const durationUnit = hcUnitConverter(durationType);
    const end = nowEpoch();
    const start = end - durationToSecs(durationCount, durationUnit);
    return autoAdjustGetData(api, symbol, start, end);
};

export const getDataForContract = (
    api,
    contractID,
    durationType = 'all',
    durationCount,
    style = 'ticks',
    granularity = 60
) => {
    const getAllData = () =>
        api.subscribeToOpenContract(contractID)
            .then(r => {
                const contract = r.proposal_open_contract;
                const symbol = contract.underlying;
                const start = contract.purchase_time;
                const sellT = contract.sell_time;
                const end = contract.sell_spot ? sellT : nowEpoch();
                return autoAdjustGetData(api, symbol, start, end, style, granularity);
            });
    
    if (durationType === 'all') {
        return getAllData();
    }

    return api.subscribeToOpenContract(contractID)
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
};
