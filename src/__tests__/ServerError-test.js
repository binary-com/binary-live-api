import ServerError from '../ServerError';

describe('ServerError', () => {
    it('can be thrown', () => {
        expect(() => {
            throw new ServerError({ error: {} });
        }).to.throw(/ServerError/);
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

        expect(str).to.contain('ServerError');
        expect(str).to.contain('some_value');
        expect(str).to.contain('Unrecognised request.');
        expect(error.name).toEqual('UnrecognisedRequest');
    });
});
