PubSub.on('message', function(data) {
    console.log(data);
});

/*
    PubSub.on('ticks', ticksFunc);
    PubSub.on('active_symbols', activeSymbolsFunc);
    PubSub.on('offerings', activeSymbolsFunc);
    PubSub.on('buy', activeSymbolsFunc);
    PubSub.on('sell', activeSymbolsFunc);
    PubSub.on('portfolio_stats', activeSymbolsFunc);
    PubSub.on('contracts_for', activeSymbolsFunc);
*/
/*
    connection.send(JSON.stringify({forget:symbol_id}));
    connection.send(JSON.stringify({sell:contract_id, price:price}));
    connection.send(JSON.stringify({buy:contract_id, price:price}));
    connection.send(JSON.stringify({contracts_for:symbol}));
*/
