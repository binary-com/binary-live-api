var LiveEvents = (function() {
    'use strict';

    var messageHandlers = {
        '*': []
    };

    var emitSingle = function (msgName, data) {
        messageHandlers[msgName].forEach(function(handler) {
            handler(JSON.parse(data));
        });
    };

    var emitWildcard = function (data) {
        messageHandlers['*'].forEach(function(handler) {
            handler(JSON.parse(data));
        });
    };

    var emit = function (msgName, data) {

        if (!messageHandlers[msgName]) return;

        emitSingle(msgName, data);
        emitWildcard(data);
    };

    var on = function (msgName, callback) {

        if (!messageHandlers[msgName]) messageHandlers[msgName] = [];

        messageHandlers[msgName].push(callback);
    };

    return {
        emit: emit,
        on: on
    };
})();

var LiveApi = (function () {
    'use strict';

    var ws,
        status = 'unknown',
        apiUrl = 'wss://ws.binary.com/websockets/contracts',
        bufferedSends = [];

    var onOpen = function() {
        while (bufferedSends.length > 0) {
            ws.send(JSON.stringify(bufferedSends.shift()));
        }
    };

    var onClose = function() {
    };

    var onError = function(error) {
        console.log(error);
    };

    var onMessage = function(e) {
        LiveEvents.emit(e.type, e.data);
    };

    var init = function(customApiUrl) {

        ws = new WebSocket(customApiUrl || apiUrl);

        ws.onopen = onOpen;
        ws.onclose = onClose;
        ws.onerror = onError;
        ws.onmessage = onMessage;
    };

    var send = function(data) {
        if (ws && ws.readystate === 1) {
            ws.send(JSON.stringify(data));
        } else {
            bufferedSends.push(data);
        }
    };

    return {
        init: init,
        status: status,
        send: send,
    };
})();

var LiveData = (function () {
    'use strict';

    LiveEvents.on('*', function(data) {
        console.log(data);
    });

    var init = function () {
        LiveApi.init();
        LiveApi.send({ portfolio: 1 });
        LiveApi.send({ offerings: {} });
    };

    return {
        init: init
    };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        LiveEvents: require('./LiveEvents'),
        LiveApi: require('./LiveApi'),
        LiveData: require('./LiveData')
    };
}
