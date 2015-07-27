import { LiveApi, LiveData, RestApi, OAuth } from '../lib/';
import { instance as LiveEvents } from '../lib/LiveEvents';


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
    const liveData = new LiveData('1C8FsTiUegCGq2ZqM8ntMdHsUUQNE9grp5p9gD6VmSmyocfcJiS0n2uOM83kakaYZMRfFCbZGI6kzfu0lYkHHoYFpMJRKKVaVHe0Ezs1KqL6JZvMwNqAUFxLfulKoalD');

    // liveData.on('message', function(data) {
    //     console.log('message', data, LiveData);
    // });

    // liveApi.getMarketHistory('frxXPDUSD').catch(function(err) {
    //     console.log('Fetch Error :-S', err);
    // });

    liveData.api.getPortfolio();

    liveData.onDataChange = function(yo) {
        console.log('yo', yo);
    }
}

ws();

console.log(Array.find)
