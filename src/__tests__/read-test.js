import describe from 'mocha.parallel';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import 'babel-polyfill';

import LiveApi from '../LiveApi';
import ws from 'ws';

describe('read', () => {
    let liveApi;
    let token = '4yFDEnFI3EpnZ7M';

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    it('should be able to get account limit', async () => {
        await liveApi.authorize(token);
        const response = await liveApi.getAccountLimits();
		expect(response).to.have.property('get_limits');
    });

	it('should be able return account limits in a server response', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.getAccountLimits();
		expect(response.get_limits.account_balance).to.equal(10000);
	});

    it('should be able to call the function getAccountSettings', () =>
        expect(() =>
            liveApi.getAccountSettings()
		).to.not.throw()
    );

	it('should be able to return account settings from a api response', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.getAccountSettings();
        expect(response.get_settings.country).to.equal('Belgium');
	});

	it('should be able to call getAccountStatus without an error', () => {
		expect(() =>
			liveApi.getAccountStatus()
		).to.not.throw();
	});

	it('should be able to get account status in a response from a server', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.getAccountStatus();
		expect(response.get_account_status).to.contains('active');
	});

	it('should be able to call getSelfExclusion without an issue', () => {
		expect(() =>
			liveApi.getSelfExclusion()
		).to.not.throw();
	});

	it('should be able to getSelfExclusion in a response from a server', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.getSelfExclusion();
		expect(response.get_self_exclusion.max_balance).to.equal('10000');
	});

	it('should be able to call logout function', () => {
		expect(() =>
			liveApi.logOut()
		).to.not.throw();
	});

	it('should be able to sign user out of his account', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.logOut();
		expect(response).to.not.have.property('error');
	});

	it('it should be able to call getStatement function without an issue', () =>
		expect(() =>
			liveApi.getStatement({
                statement: 1,
                description: 1,
                limit: 100,
            })
        ).to.not.throw()
	);

	it('should be able to get a statement if logged in', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.getStatement();
        expect(response).to.have.property('statement');
	});

	it('should be able to call getProfitTable without an error', () => {
		expect(() =>
			liveApi.getProfitTable()
		).to.not.throw();
	});

	it('scan get profitTable from the server', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.getProfitTable();
		expect(response).to.have.property('profit_table');
	});

    it('should be able to subscribe to balance updates', () => {
        expect(() =>
            liveApi.subscribeToBalance()
        ).to.not.throw();
    });

    it('should be able to unsubscribe from balance updates', () => {
        expect(() =>
            liveApi.unsubscribeFromBalance()
        ).to.not.throw();
    });

    it('should be able to subscribe to open contract updates', () => {
        expect(() =>
            liveApi.subscribeToAllOpenContracts()
        ).to.not.throw();
    });

    it('should be able to unsubscribe from open contract updates', () => {
        expect(() =>
            liveApi.unsubscribeFromAllOpenContracts()
        ).to.not.throw();
    });

    it('should be able to subscribe to transaction updates', () => {
        expect(() =>
            liveApi.subscribeToTransactions()
        ).to.not.throw();
    });

    it('should be able to unsubscribe from transaction updates', () => {
        expect(() =>
            liveApi.unsubscribeFromTransactions()
        ).to.not.throw();
    });

	it('should be able to call subscribeToOpenContract without an issue', () => {
		expect(() =>
			liveApi.subscribeToOpenContract()
		).to.not.throw();
	});

	it('should subscribeToOpenContract and return a server response', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.subscribeToOpenContract();
		expect(response.echo_req).to.have.property('subscribe');
	});
});
