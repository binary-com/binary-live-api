var LiveEvents = (function() {
    'use strict';

    var messageHandlers = {
        '*': []
    };

    var emitSingle = function (msgName, data) {
        messageHandlers[msgName].forEach(function(handler) {
            handler(data);
        });
    };

    var emitWildcard = function (data) {
        messageHandlers['*'].forEach(function(handler) {
            handler(data);
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
