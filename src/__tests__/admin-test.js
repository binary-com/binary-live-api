import websocket from 'ws';
import LiveApi from '../LiveApi';

describe('admin', () => {
    let liveApi;

    beforeAll(() => {
        liveApi = new LiveApi({ websocket, appId: 1089 });
    });

    it('should be able to call getApiToken without an error', async () => {
        expect(() => liveApi.getApiTokens()).not.toThrow();
    });

    it('should be able to call deleteApiToken function without an error', () => {
        expect(() => liveApi.deleteApiToken('token')).not.toThrow();
    });

    it('should be able to call createApiToken without an issue', () => {
        expect(() => liveApi.createApiToken('TokenName')).not.toThrow();
    });

    it('should be able to call changePassword', () => {
        expect(() => liveApi.changePassword('oldpassword', 'newpassword')).not.toThrow();
    });

    it('should be able to call the function registerApplication with no error', () => {
        expect(() => liveApi.registerApplication({ name: 'AppName', link: 'Applink' })).not.toThrow();
    });

    it('should be able to call getAllAppList function without throwing error ', () => {
        expect(() => liveApi.getAllAppList()).not.toThrow();
    });

    it('should be able to call getAppslistById function without throwing error', () => {
        expect(() => liveApi.getAppslistById(0)).not.toThrow();
    });

    it('should be able to call the deleteApplication function without throwing error', () => {
        expect(() => liveApi.deleteApplication(0)).not.toThrow();
    });

    it('it should be able to call the function createRealAccountMaltaInvest without error', () => {
        expect(() =>
            liveApi.createRealAccountMaltaInvest({
                name    : 'name',
                username: 'username',
            })
        ).not.toThrow();
    });

    it.skip('should be able to call createRealAccount function with no error', async () =>
        expect(
            await liveApi.createRealAccount({
                name    : 'name',
                username: 'username',
            })
        ).not.toThrow()
    );

    it('should be able to call the function setAccountCurrency with no error', () => {
        expect(() => liveApi.setAccountCurrency('EUR')).not.toThrow();
    });

    it('should be able to call the function setSelfExclusion without error', () => {
        expect(() => liveApi.setSelfExclusion({ balance: 300, limit: 30 })).not.toThrow();
    });

    it('should be able to call setAccountSettings without throwing error', () => {
        expect(() =>
            liveApi.setAccountSettings({
                option1: 'option1',
                option2: 'option2',
            })
        ).not.toThrow();
    });

    it('should be able to call setTnCApproval function without thrwoing error', () => {
        expect(() => liveApi.setTnCApproval()).not.toThrow();
    });

    it('should be able to call setTnCApproval function without thrwoing error', () => {
        expect(() => liveApi.mt5LoginList()).not.toThrow();
    });
});
