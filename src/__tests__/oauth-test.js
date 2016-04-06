import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import 'babel-polyfill';

import { oauthUrl, oauthUrlWithLanguage, parseOAuthResponse } from '../OAuth';

describe('OAuth', () => {
    let appId = 'id-ud5PPOTeBcEnkam7ArXIc4AO9e9gw';

    it('should be able to get the OAuth url', () => {
        const url = oauthUrl(appId);
        expect(url).to.contain('binary.com');
    });

    it('should be able to get the OAuth url with language', () => {
        const url = oauthUrlWithLanguage(appId, 'RU');
        expect(url).to.contain('binary.com');
        expect(url).to.contain('RU');
    });

    it('should be able to parse the simplest response url', () => {
        const response = '/redirect?acct1=vr123&token1=a1-456';
        const parsed = parseOAuthResponse(response);
        const expected = [
            { account: 'vr123', token: 'a1-456' },
        ];
        expect(expected).to.deep.equal(parsed);
    });

    it('should throw an exception if the url is not valid', () => {
        expect(() => parseOAuthResponse('not valid')).to.throw();
    });

    it('should parse multipe account url', () => {
        const response = '/redirect?acct1=vr123&token1=a1-456&acct2=cc123&token2=a1-bob&acct3=ml123&token3=a1-hello';
        const parsed = parseOAuthResponse(response);
        const expected = [
            { account: 'vr123', token: 'a1-456' },
            { account: 'cc123', token: 'a1-bob' },
            { account: 'ml123', token: 'a1-hello' },
        ];
        expect(expected).to.deep.equal(parsed);
    });

    it('should parse actual url response', () => {
        const response = 'https://test.example.com/redirect?' +
            'acct1=CR300810&token1=a1-isZfteMh8GOxnpPUIi1rlUqepWXKW&' +
            'acct2=VRTC547953&token2=a1-LVaOlP2v56wDwE7Fv8VftJNDdIt2G';
        const parsed = parseOAuthResponse(response);
        const expected = [
            { account: 'CR300810', token: 'a1-isZfteMh8GOxnpPUIi1rlUqepWXKW' },
            { account: 'VRTC547953', token: 'a1-LVaOlP2v56wDwE7Fv8VftJNDdIt2G' },
        ];
        expect(expected).to.deep.equal(parsed);
    });
});
