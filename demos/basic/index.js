var LiveApi = window['binary-live-api'].LiveApi;
var api = new LiveApi();

function pingWithEventHandlers() {
    api.events.on('ping', function(response) {
        console.log(response);
    });
    api.ping();
}

function pingWithPromises() {
    api.ping().then(function(response) {
        console.log(response);
    });
}

function foreverPing() {
    setInterval(() => api.ping().then(response => console.log(response)), 1000);
}

api.subscribeToTick('R_100');
api.unsubscribeFromTick('R_100');

api.resubscribe();
