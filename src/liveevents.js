export default class LiveEvents {

    constructor() {
        this.messageHandlers = {};
    }

    emitSingle(msgType, msgData) {
        (this.messageHandlers[msgType] || []).forEach(handler => {
            handler(msgData);
        });
    }

    emitWildcard(msgData) {
        this.messageHandlers['*'].forEach(handler => {
            handler(msgData);
        });
    }

    emit(msgType, msgData) {
        this.emitSingle(msgType, msgData);
        this.emitWildcard(msgData);
    }

    on(msgType, callback) {
        if (!this.messageHandlers[msgType]) {
            this.messageHandlers[msgType] = [callback];
        } else {
            this.messageHandlers[msgType].push(callback);
        }
    }
}
