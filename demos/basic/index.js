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

api.getCandlesForLastNDays('R_50', 30);
