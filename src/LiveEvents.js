type LivEventHandler = (msgData: Object) => void;

export default class LiveEvents {

    messageHandlers: Object;

    constructor() {
        this.messageHandlers = {};
    }

    emitSingle(msgType: string, msgData: Object) {
        const handlers = this.messageHandlers[msgType] || [];
        handlers.forEach(handler => {
            handler(msgData);
        });
    }

    emitWildcard(msgData: Object) {
        const handlers = this.messageHandlers['*'] || [];
        handlers.forEach(handler => {
            handler(msgData);
        });
    }

    emit(msgType: string, msgData: Object) {
        this.emitSingle(msgType, msgData);
        this.emitWildcard(msgData);
    }

    on(msgType: string, callback: LivEventHandler) {
        if (!this.messageHandlers[msgType]) {
            this.messageHandlers[msgType] = [callback];
        } else {
            this.messageHandlers[msgType].push(callback);
        }
    }

    ignoreAll(msgType: string) {
        delete this.messageHandlers[msgType];
    }
}
