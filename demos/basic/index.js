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

api.getStatesForCountry('in').then(function(response) {
    console.log(response);
});

api.getTradingTimes(new Date()).then(function(response) {
    console.log(response);
});


// pingWithEventHandlers();
pingWithPromises();
