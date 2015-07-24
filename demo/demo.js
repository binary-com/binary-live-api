import { LiveApi, LiveData, RestApi } from '../lib/';

console.log(LiveData, LiveApi, RestApi);

LiveData.on('message', function(data) {
    console.log('message', data, LiveData);
});

LiveData.init('9cRhCQRGfhyKJd016aKPkPxjkwXOiPhMHkJmK9pbAOnW3lDqz5fiV8KokKoJY9ZuDqJtkxQyQqWWc3Hvsw2nGyozyWj06zDQyfXIyJhhNc5ezHUpqfkAxFM9UnuiOpyr');

LiveApi.getMarketHistory('frxXPDUSD');
