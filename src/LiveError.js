export default class LiveError extends Error {
    constructor(errorObj) {
        super();
        this.message = errorObj.message;
        this.stack = (new Error()).stack;
        this.error = errorObj;
        this.name = this.constructor.name;
    }

    toString() {
        const { message, error: { code, echo_req } } = this.error;
        return `Server Error: (${code}) ${message}\n${JSON.stringify(echo_req, 2)}`;
    }
}
