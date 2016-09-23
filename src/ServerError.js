export default class ServerError extends Error {

    stack: any;
    error: ApiErrorResponse;
    name: string;
    message: string;

    constructor(errorObj: ApiErrorResponse) {
        super(errorObj);

        this.stack = (new Error()).stack;
        this.error = errorObj;
        this.name = errorObj.error.code;

        const { error: { message }, echo_req } = errorObj;

        const echoStr = JSON.stringify(echo_req, null, 2);
        this.message = `[ServerError] ${message}\n${echoStr}`;
    }
}
