var LiveApi = (function () {

    var status = 'unknown';

    var onOpen = function() {
        connection.send('Ping'); // Send the message 'Ping' to the server
    };

    var onError = function(error) {
        console.log(error);
    };

    var onMessage = function(e) {
        PubSub.emit(e.type, e.data);
    };

    var connection = new WebSocket('wss://ws.binary.com/websockets/contracts');

    connection.onopen = onOpen;
    connection.onerror = onError;
    connection.onmessage = onMessage;

    var send = function(data) {
        connection.send(JSON.stringify(data));
    };

    return {
        status: status,
        send: send
    };
})();
