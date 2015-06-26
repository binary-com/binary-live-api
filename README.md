# binary-live-api

This library is a high-level abstraction over the [Binary Websockets API](https://github.com/binary-com/websockets-api)

You can use it directly, as explained in the [Binary.com Websockets API Reference](https://github.com/binary-com/websockets-api/wiki)

## LiveEvents

```
LiveEvents.emit('message', data);
```

```
LiveEvents.on('msg', function(data) {
    // handles a specific message 'msg'
});
```

```
LiveEvents.on('*', function(data) {
    // handles any message
});
```


## LiveApi

```
LiveApi.status // current connection status
```

```
LiveApi.send(data); // sends data object to server
```

```
LiveApi.authorize(token);
```

```
LiveApi.getOfferings();
```

```
LiveApi.trackSymbol('symbol');
```

```
LiveApi.trackSymbols(['symbol1', 'symbol2', ...]);
```

```
LiveApi.untrackSymbol('symbol');
```

```
LiveApi.untrackSymbols(['symbol1', 'symbol2', ...]);
```

```
LiveApi.getActiveSymbolsByName();
```

```
LiveApi.getActiveSymbolsBySymbol();
```

```
LiveApi.getContractsForSymbol('symbol');
```

```
LiveApi.getPrice(contractProposal);
```

```
LiveApi.buyContract(contractId, price);
```

```
LiveApi.getPortfolio();
```

```
LiveApi.sellContract(contractId, price);
```

## LiveData

```
LiveData.init(apiToken);
```

```
LiveData.trackActiveSymbols();
```

```
LiveData.offerings
LiveData.activeSymbols
LiveData.Ticks
LiveData.portfolio
```
