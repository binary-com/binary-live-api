export default class LiveEvents {

    constructor() {
        this.messageHandlers = {
            '*': []
        };
    }

    emitSingle(msgName, data) {
        this.messageHandlers[msgName].forEach(function(handler) {
            handler(JSON.parse(data));
        });
    }

    emitWildcard(data) {
        this.messageHandlers['*'].forEach(function(handler) {
            handler(JSON.parse(data));
        });
    }

    emit(msgName, data) {

        if (!this.messageHandlers[msgName]) return;

        emitSingle(msgName, data);
        emitWildcard(data);
    }

    on(msgName, callback) {

        if (!this.messageHandlers[msgName]) this.messageHandlers[msgName] = [];

        this.messageHandlers[msgName].push(callback);
    }
}
