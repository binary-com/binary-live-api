export default class LiveEvents {

    constructor() {
        this.messageHandlers = {
            '*': []
        };
    }

    emitSingle(msgType, data) {
        this.messageHandlers[msgType].forEach(handler => {
            handler(data);
        });
    }

    emitWildcard(data) {
        this.messageHandlers['*'].forEach(handler => {
            handler(data);
        });
    }

    emit(msgType, msgData) {

        if (!this.messageHandlers[msgType]) return;

        this.emitSingle(msgType, msgData);
        this.emitWildcard(msgData);
    }

    on(msgType, callback) {

        if (!this.messageHandlers[msgType]) this.messageHandlers[msgType] = [];

        this.messageHandlers[msgType].push(callback);
    }
}
