# binary-live-api

This library is a high-level abstraction over the [Binary.com Developers Portal](https://developers.binary.com)

## Utility Functions

```
isReady() - true if connected, false if not yet connected or disconnected
```

```
send(data)
```

## Unauthenticated Calls

```
getMarketHistory(marketHistoryOptions = {})
```

```
getActiveSymbolsBrief()
```

```
getActiveSymbolsFull()
```

```
getContractsForSymbol(symbol)
```

```
getPayoutCurrencies()
```

```
getTradingTimes(date = Date.now())
```

```
ping()
```

```
getServerTime()
```

## Streams


```
subscribeToTick(symbol)
```

```
subscribeToTicks(symbols)
```

```
getLatestPriceForContractProposal(contractProposal)
```

```
unsubscribeFromTick(symbol)
```

```
unsubscribeFromTicks(symbols)
```

```
unsubscribeFromAllTicks()
```

```
unsubscribeFromAllProposals()
```

```
unsubscribeFromAllPortfolios()
```

```
unsubscribeFromAlProposals()
```

## Authenticated Calls

```
authorize(token)
```

```
getBalance()
```

```
getStatement(statementOptions = {})
```

```
getPortfolio(subscribeToUpdates)
```

```
getPriceForOpenContract(contractId)
```

```
buyContract(contractId, price)
```

```
sellContract(contractId, price)
```
