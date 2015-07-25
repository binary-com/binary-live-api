const rootUrl = 'https://rmg-prod.apigee.net/v1/binary';

export default class RestApi {

    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    fetcher(reqStr) {
        return fetch(reqStr, {
            mode: 'no-cors',
            headers: {
                'Authorization': 'Bearer ' + this.accessToken
            }
        });
    }

    fetcherPost(reqStr, body) {
        return fetch(reqUrl, {
            mode: 'no-cors',
            method: 'post',
            body,
            headers: {
                'Authorization': 'Bearer ' + this.accessToken
            }
        });
    }

    // Marketplace Discovery ///////////////////////////////////////////////////////

    // Markets Discovery
    getMarketsList() {
        return this.fetcher(`${rootUrl}/markets/`);
    }

    // Symbols for Market
    getMarket(market) {
        return this.fetcher(`${rootUrl}/markets/${market}`);
    }

    // Exchanges Discovery
    getExchangesList() {
        return fetch(`${rootUrl}/exchanges/`);
    }

    // Exchange Details
    getExchange(exchange) {
        return this.fetcher(`${rootUrl}/exchanges/${exchange}`);
    }

    // Symbols Discovery ///////////////////////////////////////////////////////////

    // Symbols Discovery
    getSymbolsList() {
        return this.fetcher(`${rootUrl}/symbols/`);
    }

    // Symbol Detail
    getSymbol(symbol) {
        return this.fetcher(`${rootUrl}/symbols/${symbols}`);
    }

    // Symbol Price
    getSymbolPrice(symbol) {
        return this.fetcher(`${rootUrl}/symbols/${symbols}/price`);
    }

    // Price History ///////////////////////////////////////////////////////////////

    // Historical Tick Data
    getTickData(symbol) {
        return this.fetcher(`${rootUrl}/symbols/${symbol}/ticks`);
    }

    // Historical Candlestick Data
    getCandlestickData(symbol) {
        return this.fetcher(`${rootUrl}/symbols/${symbol}/candles`);
    }

    // Contract Discovery //////////////////////////////////////////////////////////

    // Available Contracts for Symbol
    getContracts(symbol) {
        return this.fetcher(`${rootUrl}/symbols/${symbol}/contracts`);
    }

    // Offerings Discovery
     getOfferingsList() {
        return this.fetcher(`${rootUrl}/offerings`);
    }

    // Contract Categories for Market
    getContractCategories(market) {
        return this.fetcher(`${rootUrl}/markets/${market}/contract_categories`);
    }

    // Contract Negotiation ////////////////////////////////////////////////////////

    // Payout Currencies
    getPayoutCurrencies() {
        return this.fetcher(`${rootUrl}/payout_currencies`);
    }

    // Get Contract Price
    getContractPrice(contractType, symbol, durationUnit, duration, payoutCurrency, payout, startTime, barrierLow, barrierHigh) {
        return this.fetcher(`${rootUrl}/contract/${contractType}/${symbol}/${durationUnit}/${duration}/${payoutCurrency}/${payout}/${startTime}/${barrierLow}/${barrierHigh}`);
    }

    // Buy Contract
    buyContract(contractType, symbol, durationUnit, duration, payoutCurrency, payout, startTime, barrierLow, barrierHigh) {
        apiOtions.method = 'post';
        return this.fetcher(`${rootUrl}/contract/${contractType}/${symbol}/${durationUnit}/${duration}/${payoutCurrency}/${payout}/${startTime}/${barrierLow}/${barrierHigh}`);
    }

    // Portfolio ///////////////////////////////////////////////////////////////////

    // Portfolio List
    getPortfolioList() {
        return this.fetcher(`${rootUrl}/portfolio`);
    }

    // Portfolio Detail
    getPortfolio(contract) {
        return this.fetcher(`${rootUrl}/portfolio/${contract}`);
    }

    // Sell Existing Contract
    sellContract(contract, price) {
        return this.fetcher(`${rootUrl}/portfolio/${contract}/sell/${price}`);
    }

    // Account Management //////////////////////////////////////////////////////////

    // Account Detail
    getAccount(contract) {
        return this.fetcher(`${rootUrl}/account`);
    }

    // Account Update
    updateAccount(account) {
        return this.fetcherPost(`${rootUrl}/account`, account);
    }

    // Account Creation
    createAccount(account) {
        return this.fetcherPost(`${rootUrl}/new_account`, account);
    }

    // Account /////////////////////////////////////////////////////////////////////

    // Statement
    getStatement() {
        return this.fetcher(`${rootUrl}/account/statement`);
    }

    // Countries
    getCountries() {
        return this.fetcher(`${rootUrl}/countries`);
    }
}
