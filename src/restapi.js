export const rootUrl = 'https://rmg-prod.apigee.net/v1/binary';

let authUrl = `${rootUrl}/oauth/authorize?response_type=token&client_id=ldqAtjU9Vj8xojmK0awwOerdIDvQlyWH&scope=S111&state=fjcapp01`;
let apiOptions = {
    mode: 'cors'
};

export function authorize() {

    var authWindow = window.open(authUrl, '_blank', 'clearcache=yes,clearsessioncache=yes,location=no,toolbar=no');

    authWindow.addEventListener('load', function(e) {
        var url = e.originalEvent.url;
        console.log('testing received url now!' + url);
        var matches = /[&\?]access_token=(.+)$/.exec(url);
        g.access_token = matches[1];
        if (!g.access_token) return;

        ajax_call.headers = {
            Authorization: 'Bearer ' + g.access_token
        };
        window.localStorage.setItem("access_token", g.access_token);
        authWindow.close();
        api_is_good();
    });
}


// Marketplace Discovery ///////////////////////////////////////////////////////

// Markets Discovery
export function getMarketsList() {
    return fetch(`${rootUrl}/markets/`, apiOptions);
}

// Symbols for Market
export function getMarket(market) {
    return fetch(`${rootUrl}/markets/${market}`, apiOptions);
}

// Exchanges Discovery
export function getExchangesList() {
    return fetch(`${rootUrl}/exchanges/`, apiOptions);
}

// Exchange Details
export function getExchange(exchange) {
    return fetch(`${rootUrl}/exchanges/${exchange}`, apiOptions);
}

// Symbols Discovery ///////////////////////////////////////////////////////////

// Symbols Discovery
export function getSymbolsList() {
    return fetch(`${rootUrl}/symbols/`, apiOptions);
}

// Symbol Detail
export function getSymbol(symbol) {
    return fetch(`${rootUrl}/symbols/${symbols}`, apiOptions);
}

// Symbol Price
export function getSymbolPrice(symbol) {
    return fetch(`${rootUrl}/symbols/${symbols}/price`, apiOptions);
}

// Price History ///////////////////////////////////////////////////////////////

// Historical Tick Data
export function getTickData(symbol) {
    return fetch(`${rootUrl}/symbols/${symbol}/ticks`, apiOptions);
}

// Historical Candlestick Data
export function getCandlestickData(symbol) {
    return fetch(`${rootUrl}/symbols/${symbol}/candles`, apiOptions);
}

// Contract Discovery //////////////////////////////////////////////////////////

// Available Contracts for Symbol
export function getContracts(symbol) {
    return fetch(`${rootUrl}/symbols/${symbol}/contracts`, apiOptions);
}

// Offerings Discovery
export function getOfferingsList() {
    return fetch(`${rootUrl}/offerings`, apiOptions);
}

// Contract Categories for Market
export function getContractCategories(market) {
    return fetch(`${rootUrl}/markets/${market}/contract_categories`, apiOptions);
}

// Contract Negotiation ////////////////////////////////////////////////////////

// Payout Currencies
export function getPayoutCurrencies() {
    return fetch(`${rootUrl}/payout_currencies`, apiOptions);
}

// Get Contract Price
export function getContractPrice(contractType, symbol, durationUnit, duration, payoutCurrency, payout, startTime, barrierLow, barrierHigh) {
    return fetch(`${rootUrl}/contract/${contractType}/${symbol}/${durationUnit}/${duration}/${payoutCurrency}/${payout}/${startTime}/${barrierLow}/${barrierHigh}`, apiOptions);
}

// Buy Contract
export function buyContract(contractType, symbol, durationUnit, duration, payoutCurrency, payout, startTime, barrierLow, barrierHigh) {
    apiOtions.method = 'post';
    return fetch(`${rootUrl}/contract/${contractType}/${symbol}/${durationUnit}/${duration}/${payoutCurrency}/${payout}/${startTime}/${barrierLow}/${barrierHigh}`, apiOptions);
}

// Portfolio ///////////////////////////////////////////////////////////////////

// Portfolio List
export function getPortfolioList() {
    return fetch(`${rootUrl}/portfolio`, apiOptions);
}

// Portfolio Detail
export function getPortfolio(contract) {
    return fetch(`${rootUrl}/portfolio/${contract}`, apiOptions);
}

// Sell Existing Contract
export function sellContract(contract, price) {
    return fetch(`${rootUrl}/portfolio/${contract}/sell/${price}`, apiOptions);
}

// Account Management //////////////////////////////////////////////////////////

// Account Detail
export function getAccount(contract) {
    return fetch(`${rootUrl}/account`, apiOptions);
}

// Account Update
export function updateAccount(account) {
    apiOtions.method = 'post';
    apiOtions.body = account;
    return fetch(`${rootUrl}/account`, apiOptions);
}

// Account Creation
export function createAccount(account) {
    apiOtions.method = 'post';
    apiOtions.body = account;
    return fetch(`${rootUrl}/new_account`, apiOptions);
}

// Account /////////////////////////////////////////////////////////////////////

// Statement
export function getStatement() {
    return fetch(`${rootUrl}/account/statement`, apiOptions);
}

// Countries
export function getCountries() {
    return fetch(`${rootUrl}/countries`, apiOptions);
}
