import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import ws from 'ws';
import LiveApi from '../LiveApi';


describe('admin', () => {
    let liveApi;

	before(() => {
		liveApi = new LiveApi({ websocket: ws });
	});

	it('should be able to call getApiToken without an error', () => {
		expect(() =>
			liveApi.getApiTokens()
		).to.not.throw();
	});

	it('should be able to call deleteApiToken function without an error', () => {
		expect(() =>
			liveApi.deleteApiToken('token')
		).to.not.throw();
	});

	it('should be able to call createApiToken without an issue', () => {
		expect(() =>
			liveApi.createApiToken('TokenName')
		).to.not.throw();
	});

    it('should be able to call changePassword', () => {
        expect(() =>
            liveApi.changePassword('oldpassword', 'newpassword')
        ).to.not.throw();
    });

	it('should be able to call the function registerApplication with no error', () => {
		expect(() =>
			liveApi.registerApplication({ name: 'AppName', link: 'Applink' })
		).to.not.throw();
	});

	it('should be able to call getAllAppList function without throwing error ', () => {
		expect(() =>
			liveApi.getAllAppList()
		).to.not.throw();
	});

	it('should be able to call getAppslistById function without throwing error', () => {
		expect(() =>
			liveApi.getAppslistById(0)
		).to.not.throw();
	});

	it('should be able to call the deleteApplication function without throwing error', () => {
		expect(() =>
			liveApi.deleteApplication(0)
		).to.not.throw();
	});

	it('it should be able to call the function createRealAccountMaltaInvest without error', () => {
		expect(() =>
			liveApi.createRealAccountMaltaInvest({ name: 'name', username: 'username' })
		).to.not.throw();
	});

	it.skip('should be able to call createRealAccount function with no error', () =>
		expect(
			liveApi.createRealAccount({ name: 'name', username: 'username' })
		).to.eventually.not.throw()
	);

	it('should be able to call the function setAccountCurrency with no error', () => {
		expect(() =>
			liveApi.setAccountCurrency('EUR')
		).to.not.throw();
	});

	it('should be able to call the function setSelfExclusion without error', () => {
		expect(() =>
			liveApi.setSelfExclusion({ balance: 300, limit: 30 })
		).to.not.throw();
	});

	it('should be able to call setAccountSettings without throwing error', () => {
		expect(() =>
			liveApi.setAccountSettings({ option1: 'option1', option2: 'option2' })
		).to.not.throw();
	});

	it('should be able to call setTnCApproval function without thrwoing error', () => {
		expect(() =>
			liveApi.setTnCApproval()
		).to.not.throw();
	});
});
