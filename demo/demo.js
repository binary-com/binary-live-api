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

    liveData.events.on('message', function(data) {
        console.log('message', data, LiveData);
    });

    // liveApi.getMarketHistory('frxXPDUSD').catch(function(err) {
    //     console.log('Fetch Error :-S', err);
    // });

    liveData.api.getPortfolio();

    liveData.onDataChange = function(yo) {
        console.log('yo', yo);
    };
}

ws();
