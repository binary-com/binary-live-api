import fetch from 'fetch';

export default class RestApi {

    static rootUrl = 'https://rmg-prod.apigee.net/v1/binary';

    static authUrl = `${rootUrl}/oauth/authorize?response_type=token&client_id=ldqAtjU9Vj8xojmK0awwOerdIDvQlyWH&scope=S111&state=fjcapp01`;
    static apiOptions = {
        mode: 'cors'
    };

    // Marketplace Discovery ///////////////////////////////////////////////////////

    // Markets Discovery
    getMarketsList() {
        return fetch(`${rootUrl}/markets/`, apiOptions);
    }

    // Symbols for Market
    getMarket(market) {
        return fetch(`${rootUrl}/markets/${market}`, apiOptions);
    }

    // Exchanges Discovery
    getExchangesList() {
        return fetch(`${rootUrl}/exchanges/`, apiOptions);
    }

    // Exchange Details
    getExchange(exchange) {
        return fetch(`${rootUrl}/exchanges/${exchange}`, apiOptions);
    }

    // Symbols Discovery ///////////////////////////////////////////////////////////

    // Symbols Discovery
    getSymbolsList() {
        return fetch(`${rootUrl}/symbols/`, apiOptions);
    }

    // Symbol Detail
    getSymbol(symbol) {
        return fetch(`${rootUrl}/symbols/${symbols}`, apiOptions);
    }

    // Symbol Price
    getSymbolPrice(symbol) {
        return fetch(`${rootUrl}/symbols/${symbols}/price`, apiOptions);
    }

    // Price History ///////////////////////////////////////////////////////////////

    // Historical Tick Data
    getTickData(symbol) {
        return fetch(`${rootUrl}/symbols/${symbol}/ticks`, apiOptions);
    }

    // Historical Candlestick Data
    getCandlestickData(symbol) {
        return fetch(`${rootUrl}/symbols/${symbol}/candles`, apiOptions);
    }

    // Contract Discovery //////////////////////////////////////////////////////////

    // Available Contracts for Symbol
    getContracts(symbol) {
        return fetch(`${rootUrl}/symbols/${symbol}/contracts`, apiOptions);
    }

    // Offerings Discovery
     getOfferingsList() {
        return fetch(`${rootUrl}/offerings`, apiOptions);
    }

    // Contract Categories for Market
    getContractCategories(market) {
        return fetch(`${rootUrl}/markets/${market}/contract_categories`, apiOptions);
    }

    // Contract Negotiation ////////////////////////////////////////////////////////

    // Payout Currencies
    getPayoutCurrencies() {
        return fetch(`${rootUrl}/payout_currencies`, apiOptions);
    }

    // Get Contract Price
    getContractPrice(contractType, symbol, durationUnit, duration, payoutCurrency, payout, startTime, barrierLow, barrierHigh) {
        return fetch(`${rootUrl}/contract/${contractType}/${symbol}/${durationUnit}/${duration}/${payoutCurrency}/${payout}/${startTime}/${barrierLow}/${barrierHigh}`, apiOptions);
    }

    // Buy Contract
    buyContract(contractType, symbol, durationUnit, duration, payoutCurrency, payout, startTime, barrierLow, barrierHigh) {
        apiOtions.method = 'post';
        return fetch(`${rootUrl}/contract/${contractType}/${symbol}/${durationUnit}/${duration}/${payoutCurrency}/${payout}/${startTime}/${barrierLow}/${barrierHigh}`, apiOptions);
    }

    // Portfolio ///////////////////////////////////////////////////////////////////

    // Portfolio List
    getPortfolioList() {
        return fetch(`${rootUrl}/portfolio`, apiOptions);
    }

    // Portfolio Detail
    getPortfolio(contract) {
        return fetch(`${rootUrl}/portfolio/${contract}`, apiOptions);
    }

    // Sell Existing Contract
    sellContract(contract, price) {
        return fetch(`${rootUrl}/portfolio/${contract}/sell/${price}`, apiOptions);
    }

    // Account Management //////////////////////////////////////////////////////////

    // Account Detail
    getAccount(contract) {
        return fetch(`${rootUrl}/account`, apiOptions);
    }

    // Account Update
    updateAccount(account) {
        apiOtions.method = 'post';
        apiOtions.body = account;
        return fetch(`${rootUrl}/account`, apiOptions);
    }

    // Account Creation
    createAccount(account) {
        apiOtions.method = 'post';
        apiOtions.body = account;
        return fetch(`${rootUrl}/new_account`, apiOptions);
    }

    // Account /////////////////////////////////////////////////////////////////////

    // Statement
    getStatement() {
        return fetch(`${rootUrl}/account/statement`, apiOptions);
    }

    // Countries
    getCountries() {
        return fetch(`${rootUrl}/countries`, apiOptions);
    }
}
