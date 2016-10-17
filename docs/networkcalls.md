## Network calls api

This library provide JS friendly wrapper for all network calls

Details are documented at https://developers.binary.com/api/

### ADMIN

* `deleteApiToken(token: string)`

* `getApiTokens()`

* `createApiToken(token: string, scopes: string[])`

* `changePassword(oldPassword: string, newPassword: string)`

* `registerApplication(options: Object)`

* `getAllAppList()`

* `getAppslistById(appid: number)`

* `deleteApplication(appid: number)`

* `createRealAccountMaltaInvest(options: Object)`

* `createRealAccount(options: Object)`

* `setAccountCurrency(currency: string)`

* `setSelfExclusion(options: Object)`

* `setAccountSettings(options: Object)`

* `setTnCApproval()`

----

### PAYMENT

* `getCashierLockStatus()`

* `setCashierLock(options: Object)`

* `withdrawToPaymentAgent(options: Object)`

* `paymentAgentTransfer(options: Object)`

* `transferBetweenAccounts(options: Object)`


-----

### READ

* `getAccountLimits()`

* `getAccountSettings()`

* `getAccountStatus()`

* `getSelfExclusion()`

* `logOut()`

* `getStatement(options: Object)`

* `getPortfolio()`

* `getProfitTable(options: Object)`

* `getRealityCheckSummary()`

* `unsubscribeFromBalance()`

* `subscribeToOpenContract(contractId: number)`

* `getContractInfo(contractId: number)`

* `subscribeToAllOpenContracts()`

* `unsubscribeFromAllOpenContracts()`

* `subscribeToTransactions()`

* `unsubscribeFromTransactions()`


----

### TRADE

* `buyContract(contractId: number, price: number)`

* `sellContract(contractId: number, price: number)`

* `sellExpiredContracts()`

* `topUpVirtualAccount()`


-----

### UNAUTHENTICATED

* `getActiveSymbolsBrief()`

* `getActiveSymbolsFull()`

* `getAssetIndex()`

* `authorize(token: string)`

* `getContractsForSymbol(symbol: string)`

* `unsubscribeFromTick(symbol: string)`

* `unsubscribeFromTicks(symbols: string[])`

* `unsubscribeByID(id: number)`

* `unsubscribeFromAllTicks()`

* `unsubscribeFromAllCandles()`

* `unsubscribeFromAllProposals()`

* `unsubscribeFromAllPortfolios()`

* `unsubscribeFromAllProposalsOpenContract()`

* `getLandingCompany(landingCompany: string)`

* `getLandingCompanyDetails(landingCompany: string)`

* `createVirtualAccount(options: Object)`

* `ping()`

* `getPaymentAgentsForCountry(countryCode: string)`

* `getPayoutCurrencies()`

* `getPriceProposalForContract(options: Object)`

* `subscribeToPriceForContractProposal(options: Object)`

* `getResidences()`

* `getStatesForCountry(countryCode: string)`

* `subscribeToTick(symbol: string)`

* `subscribeToTicks(symbols: string[])`

* `getTickHistory(symbol: string, options: Object)`

* `getCandles(symbol: string, options: Object)`

* `getCandlesForLastNDays(symbol: string, ndays: number)`

* `getServerTime()`

* `getTradingTimes(date: Date)`

* `verifyEmail(email: string, type: string)`

* `getWebsiteStatus()`

