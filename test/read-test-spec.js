import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import "babel-polyfill";

import LiveApi from '../src/LiveApi';
import ws from 'ws';

describe('read', function() {
	this.timeout(10000);
    let liveApi;
    let token;

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
        token = '4yFDEnFI3EpnZ7M';
    });

    it('should be able to get account limit', ()=> {
    	expect( ()=> 
    		liveApi.getAccountLimits()).to.not.throw()
    });

	it('should be able return account limits in a server response', async (done) => {

		return await liveApi.authorize(token).then(
		 				()=> liveApi.getAccountLimits()
		 				.then(
  							(response) => {
  								expect(response).to.not.have.property('error');
  								expect(response.get_limits.account_balance).to.equal(10000);
  								done();
  							}, (err) => {
  								expect(err).to.equal(null);
  								done();
  							})
  						);

	});

    it('should be able to call the function getAccountSettings without error', () => {
    	expect( ()=> 
    		liveApi.getAccountSettings()).to.not.throw()
    });
	
	it('should be able to return account settings from a api response', async (done) => {

		return await liveApi.authorize(token).then(
		 				()=> liveApi.getAccountSettings()
		 				.then(
  							(response) => {
  								expect(response).to.not.have.property('error');
  								expect(response.get_settings.country).to.equal('Belgium');
  								done();
  							}, (err) => {
  								console.log('the error at getAccountSettings', err);
  								expect(err).to.equal(null);
  								done();
  							})
  						);

	});

	it('should be able to call getAccountStatus without an error', () => {
		expect( () =>
			liveApi.getAccountStatus()).to.not.throw();
	});

	it('should be able to get account status in a response from a server', async (done) => {

		return await liveApi.authorize(token).then(
		 				()=> liveApi.getAccountStatus()
		 				.then(
  							(response) => {
  								expect(response).to.not.have.property('error');
  								expect(response.get_account_status).to.contains('active');
  								done();
  							}, (err) => {
  								console.log('the error at getAccountStatus', err);
  								expect(err).to.equal(null);
  								done();
  							})
  						);
	});

	it('should be able to call getSelfExclusion without an issue', () => {
		expect( () =>
			liveApi.getSelfExclusion()).to.not.throw();
	});

	it('should be able to getSelfExclusion in a response from a server', async (done) => {

		return await liveApi.authorize(token).then(
		 				()=> liveApi.getSelfExclusion()
		 				.then(
  							(response) => {
  								expect(response).to.not.have.property('error');
  								expect(response.get_self_exclusion.max_balance).to.equal('10000');
  								done();
  							}, (err) => {
  								console.log('error raised at getSelfExclusion', err);
  								expect(err).to.equal(null);
  								done();
  							})
  						);
	});

	it('should be able to call logout function without issue', () => {
		expect( () => 
			liveApi.logOut()).to.not.throw();
	});

	it('should be able to sign user out of his account', async () => {

		return await liveApi.authorize(token).then(
		 				()=> liveApi.logOut()
		 				.then(
  							(response) => {
  								expect(response).to.not.have.property('error');
  								done();
  							}, (err) => {
  								console.log('error at logout', err);
  								expect(err).to.equal(null);
  								done();
  							})
  						);
	});

	it('it should be able to call getStatement function without an issue', ()=> {
		expect( () => 
			liveApi.getStatement({
			statement: 1,
  			description: 1,
  			limit: 100
		})).to.not.throw();
	});

	it('should return statement from response without an error', async () => {

		return await liveApi.authorize(token).then(
		 				()=> liveApi.getStatement({
		 					statement: 1,
  							description: 1,
  							limit: 100
  						})
  						.then(
  							(response) => {
  								expect(response).to.not.have.property('error');
  							}, (err) => {
  								console.log('error at getStatement', err);
  								expect(err).to.equal(null);
  							})
  						);
	});

	it('should be able to call getProfitTable without an error', () => {
		expect( () =>
			liveApi.getProfitTable({description: 1})).to.not.throw();
	});

	it('should be able to return profitTable from the server', async () => {
		
		return await liveApi.authorize(token).then(
		 				()=> liveApi.getProfitTable({description:1}).then(
		 					null, (err) => {
		 						expect(err).to.have.property('message');
		 						expect(err.message).to.contains('This account is unavailable.');
		 						done();
		 					})
		 				);
		
	});

	it('should be able to call subscribeToOpenContract without an issue', () => {
		expect( () =>
			liveApi.subscribeToOpenContract().to.not.throw());
	});

	it('should subscribeToOpenContract and return a server response', async (done) =>{
		return await liveApi.authorize(token).then(
			() => liveApi.subscribeToOpenContract().then(
				(response) => {
					expect(response.echo_req).to.have.property('subscribe');
					expect(response.echo_req.subscribe).to.equal(1);
					done();
				}, (err) =>{
					console.log('error at subscribeToOpenContract', err);
					expect(err).to.equal(null);
					done();
				})
			);
	})

});