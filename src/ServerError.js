type ServerErrorResponse = {
    msg_type: string,
    echo_req: Object,
    error: {
        code: string,
        message: string,
    },
}

type ServerSuccessResponse = {
    msg_type: string,
    req_id: ?number,
    echo_req: Object,
}

export default class ServerError extends Error {

    stack: any;
    error: ServerErrorResponse;
    name: string;
    message: string;

    constructor(errorObj: ServerErrorResponse) {
        super(errorObj);

        this.stack = (new Error()).stack;
        this.error = errorObj;
        this.name = this.constructor.name;

        const { error: { message }, echo_req } = errorObj;
        const echoStr = JSON.stringify(echo_req, null, 2);
        this.message = `[ServerError] ${message}\n${echoStr}`;
    }
}
