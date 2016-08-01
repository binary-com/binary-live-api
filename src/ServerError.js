export default class ServerError extends Error {

    constructor(errorObj = { error: {} }) {
        super(errorObj);

        this.stack = (new Error()).stack;
        this.error = errorObj;
        this.name = this.constructor.name;

        const { error: { message }, echo_req } = errorObj;
        this.message = `[ServerError] ${message}\n${JSON.stringify(echo_req, 2)}`;
    }
}
