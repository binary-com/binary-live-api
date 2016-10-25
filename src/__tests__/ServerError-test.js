import ServerError from '../ServerError';

describe('ServerError', () => {
    it('can be thrown', () => {
        expect(() => {
            throw new ServerError({ error: {} });
        }).toThrow(/ServerError/);
    });

    it('contains all elements of the error response', () => {
        const errorResponse = {
            echo_req: {
                some_key: 'some_value',
            },
            error: {
                message: 'Unrecognised request.',
                code: 'UnrecognisedRequest',
            },
            msg_type: 'error',
        };

        const error = new ServerError(errorResponse);
        const str = error.toString();

        expect(str).toContain('ServerError');
        expect(str).toContain('some_value');
        expect(str).toContain('Unrecognised request.');
        expect(error.name).toEqual('UnrecognisedRequest');
    });
});
