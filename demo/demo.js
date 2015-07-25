import { LiveApi, LiveData, RestApi, OAuth } from '../lib/';

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
    const liveData = new LiveData('iLEylxcgJAabTQ4jrKwZEfNSvXYN4lcqLtnbLfuVZxyOysCYnW0pp3AJIJHZibUiyGqiaeXrL1S4TMLzAOYeZkjV2G2LTYLQNtp6vN04K1HnWwz7VvMAeAieCVtqR5dS');

    liveData.on('message', function(data) {
        console.log('message', data, LiveData);
    });

    liveApi.getMarketHistory('frxXPDUSD').catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

rest();
