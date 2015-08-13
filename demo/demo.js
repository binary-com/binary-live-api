import { LiveApi } from '../lib/';

function rest() {

    //new OAuth().authorize();

    const restApi = new RestApi('lNZzR4lt14AGppZTt1TRFznELoo6');
    restApi.getMarketsList().then(response => {
        response.json().then(function(json) {
            console.log(json);
        });
    });
}

function ws() {
    const liveApi = new LiveApi();
    liveApi.authorize('yVHlmNpJNKfOUgJ2UfFAhujYnYGrnlozvg63bHdhA3LqyhtE');

    liveApi.events.on('*', function(data) {
        console.log(data);
    });

    // liveData.api.getOfferings();
    // liveData.api.getActiveSymbolsByName(); // active_symbols not working!!!
    // liveData.api.getContractsForSymbol('GBP/AUD');

    // liveData.api.getPortfolio();

    //liveData.api.trackSymbol('GBP/AUD');
    //liveData.api.getMarketHistory();

    //liveData.api.getPrice();

    liveApi.getStatement();
}

ws();
