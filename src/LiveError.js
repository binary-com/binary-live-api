export default class LiveError extends Error {
    constructor(errorObj) {
        super();
        this.message = `Server Error: (${errorObj.code}) ${errorObj.message}, caused by ${errorObj.echo_req}`;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}
