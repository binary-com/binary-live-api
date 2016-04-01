import describe from 'mocha.parallel';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import 'babel-polyfill';
import LiveApi from '../src/LiveApi';
import ws from 'ws';

describe('payment', () => {
    let liveApi;
    let token = '4yFDEnFI3EpnZ7M';

    beforeEach(() => {
        liveApi = new LiveApi({ websocket: ws });
    });

    it('should be able to get cashierLock status', async () => {
		await liveApi.authorize(token);
		const response = await liveApi.getCashierLockStatus();
		expect(response).to.have.property('cashier_password');
    });

    it('should be able to Lock Cashier', () => {
		expect(() =>
            liveApi.setCashierLock({ lock_password: '12345768' }))
        .to.not.throw();
    });

    it('should be able to Unlock Cashier', () => {
		expect(() =>
            liveApi.setCashierLock({ unlock_password: '12345768' }))
        .to.not.throw();
    });

    it.skip('should return server error when wrong verification_code is provided', async () => {
		await liveApi.authorize(token);
        const response = await liveApi.withdrawToPaymentAgent({
            paymentagent_loginid: 'CR100001',
            currency: 'USD',
            amount: 1000,
            verification_code: 'Ag76JL9+B/g=',
        });
        expect(response.name).to.equal('Error');
        expect(response.message).to.contains('Input validation failed: verification_code');
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

    it.skip('should throw PaymentAgentTransferError where payment agent is not available', async () => {
		await liveApi.authorize(token);
        const response = await liveApi.paymentAgentTransfer({
            transfer_to: 'CR100001',
            currency: 'USD',
            amount: 1000,
        });
        expect(response.message).to.eventually.contains('Payment Agents are not available on this site.'); // ???
    });

    it('should allow payment agent perform transfer', () => {
        expect(() =>
            liveApi.paymentAgentTransfer({
            transfer_to: 'CR100001',
            currency: 'USD',
            amount: 1000,
        })).to.not.throw();
    });

    it('can perform transfer between MLF and MLT accounts', () =>
        expect(() =>
            liveApi.transferBetweenAccounts({
                account_from: 'MF3642',
                account_to: 'MLT78079',
                currency: 'EUR',
                amount: 1000,
            })
		).to.not.throw()
    );

    it.skip('should be able to perform transfer between MLT and MLF accounts and return response', async () => {
        // The two from and to accounts must be correct and exist in the token account.
        // If not, the account would be disabled.
        await liveApi.authorize(token);
        const response = await liveApi.transferBetweenAccounts({
            account_from: 'MF3642',
            account_to: 'MLT78079',
            currency: 'EUR',
            amount: 1000,
        });

        expect(response).to.have.property('transfer_between_accounts');
    });
});
