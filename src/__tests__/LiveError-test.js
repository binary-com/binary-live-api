import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import 'babel-polyfill';

import LiveError from '../LiveError';

describe('LiveError', () => {
    it('requires an error object', () => {
        expect(() => {
            throw new LiveError();
        }).to.throw(TypeError);
    });

    it('can be thrown', () => {
        expect(() => {
            throw new LiveError({});
        }).to.throw(/LiveError/);
    });

    it('when converted to string, contains message', () => {
        const error = new LiveError({ message: 'some msg' });
        const str = error.toString();
        expect(str).to.contain('some msg');
    });
});
