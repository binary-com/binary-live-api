LiveEvents.on('message', function(data) {
    console.log(data);
});

LiveApi.send({portfolio:1});

/*
    LiveEvents.on('ticks', ticksFunc);
    LiveEvents.on('active_symbols', activeSymbolsFunc);
    LiveEvents.on('offerings', activeSymbolsFunc);
    LiveEvents.on('buy', activeSymbolsFunc);
    LiveEvents.on('sell', activeSymbolsFunc);
    LiveEvents.on('portfolio_stats', activeSymbolsFunc);
    LiveEvents.on('contracts_for', activeSymbolsFunc);
*/
/*
    LiveApi.send(JSON.stringify({forget:symbol_id}));
    LiveApi.send(JSON.stringify({sell:contract_id, price:price}));
    LiveApi.send(JSON.stringify({buy:contract_id, price:price}));
    LiveApi.send(JSON.stringify({contracts_for:symbol}));
*/
