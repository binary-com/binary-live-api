import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import "babel-polyfill";
import LiveApi from '../src/LiveApi';
import ws from 'ws';

describe('payment', function() {
	this.timeout(10000);
    let liveApi;
    let token;

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
        token = '4yFDEnFI3EpnZ7M';
    });

    it('should be able to get cashierLock status', async (done) => {
		await liveApi.authorize(token);
 		const response = await liveApi.getCashierLockStatus();
		expect(response).to.have.property('cashier_password');
        done();
    });

    it('should be able to LockCashier', () => {
    	expect(() =>
            liveApi.setCashierLock({ lock_password: '12345768' }))
        .to.not.throw();
    });

    it('should be able to UnLockCAshier', () => {
    	expect(() =>
            liveApi.setCashierLock({ unlock_password:'12345768' }))
        .to.not.throw();
    });

    it('should return server error when wrong verification_code is provided', async (done) => {
		await liveApi.authorize(token);
        const response = await liveApi.withdrawToPaymentAgent({
            paymentagent_loginid: 'CR100001',
            currency: 'USD',
            amount: 1000,
            verification_code: 'Ag76JL9+B/g=',
        });
        expect(err.name).to.equal('Error');
        expect(err.message).to.contains('Input validation failed: verification_code');
        done();
    });

	it('should be able to call withdrawToPaymentAgent function without an issue', () => {
        expect(() =>
            liveApi.withdrawToPaymentAgent({
                paymentagent_loginid: 'CR100001',
                currency: 'USD',
                amount: 1000,
                verification_code: 'Ag76JL9+B/g=',
            })
		).to.not.throw();
    });

    it('should throw PaymentAgentTransferError where payment agent is not available', async (done) => {
		await liveApi.authorize(token);
        const response = await liveApi.paymentAgentTransfer({
            transfer_to: 'CR100001',
            currency: 'USD',
            amount: 1000
        });
        expect(response).to.equal(null);
        done();
        expect(err.message).to.contains('Payment Agents are not available on this site.'); // ???
    });

    it('should allow payment agent perform transfer', () => {
        expect(() =>
            liveApi.paymentAgentTransfer({
            transfer_to: 'CR100001',
            currency: 'USD',
            amount: 1000
        })).to.not.throw();
    });

    it('can perform transfer between MLF and MLT accounts', () => {
        expect(() =>
            liveApi.transferBetweenAccounts({
                account_from: 'MF3642',
                account_to: 'MLT78079',
                currency: 'EUR',
                amount: 1000
            })
		).to.not.throw()
    });

    it('should be able to perform transfer between MLT and MLF accounts and return response', async (done) => {
        // Important, the two from and to accounts must be correct and exist in the token account.
        // if not the account would be disabled.
        await liveApi.authorize(token);
        const response = await liveApi.transferBetweenAccounts({
            account_from: 'MF3642',
            account_to: 'MLT78079',
            currency: 'EUR',
            amount: 1000,
        });

        expect(response).to.not.have.property('error');
        expect(response.msg_type).to.equal('transfer_between_accounts');
        expect(response.accounts).to.contains('MLT78079');
        expect(response.accounts).to.contains('MF3642');
        done();
    });
});
