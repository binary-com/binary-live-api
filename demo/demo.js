import { LiveApi, LiveData } from '../lib/';

const liveApi = new LiveApi();
const liveData = new LiveData('iLEylxcgJAabTQ4jrKwZEfNSvXYN4lcqLtnbLfuVZxyOysCYnW0pp3AJIJHZibUiyGqiaeXrL1S4TMLzAOYeZkjV2G2LTYLQNtp6vN04K1HnWwz7VvMAeAieCVtqR5dS');

console.log(liveApi, LiveApi);

liveData.on('message', function(data) {
    console.log('message', data, LiveData);
});

liveApi.getMarketHistory('frxXPDUSD');
