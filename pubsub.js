var PubSub = (function () {
    'use strict';

    var messageHandlers = {};

    var emit = function(msgName, data) {

        if (!messageHandlers[msgName]) return;

        messageHandlers[msgName].forEach(function(handler) {
            handler(data);
        });
    };

    var on = function(msgName, callback) {
        if (!messageHandlers[msgName]) messageHandlers[msgName] = [];
        messageHandlers[msgName].push(callback);
    };

    return {
        emit: emit,
        on: on
    };
})();
