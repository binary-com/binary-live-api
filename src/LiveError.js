export default class LiveError extends Error {
    constructor(errorObj) {
        super();
        this.message = `Server Error: (${errorObj.code}) ${errorObj.message}`;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}
