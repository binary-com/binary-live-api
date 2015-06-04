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
        PubSub.emit(e.type, e.data);
    };

    var init = function(customApiUrl) {

        ws = new WebSocket(customApiUrl || apiUrl);

        ws.onopen = onOpen;
        ws.onclose = onClose;
        ws.onerror = onError;
        ws.onmessage = onMessage;
    }

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
