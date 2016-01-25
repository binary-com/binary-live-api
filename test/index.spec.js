import expect from 'expect';
import { add } from '../src';

describe('add', () => {
    it('should add 2 and 2', () => {
        const actual = 2 + 2;
        expect(actual).toEqual(4);
    });
});
