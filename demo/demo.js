import { LiveData, RestApi, OAuth } from '../lib/';

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
    const liveData = new LiveData('fcR6ZySPS3u0ezqOEt0bCZqpAuvXejg0vRUtulSAaCDISBPlrWtjOiIK1u8ZhGf0D8fJVWi4Zepb35jwAD6IpE7JF3gyFpT0BD6aH8Q7xIhb4FNKqasHWySW1pRJBI7T');

    liveData.events.on('*', function(data) {
        console.log(data, liveData);
    });

    // liveData.api.getOfferings();
    // liveData.api.getActiveSymbolsByName(); // active_symbols not working!!!
    // liveData.api.getContractsForSymbol('GBP/AUD');

    liveData.api.getPortfolio();

    //liveData.api.trackSymbol('GBP/AUD');
    //liveData.api.getMarketHistory();

    //liveData.api.getPrice();

}

ws();
