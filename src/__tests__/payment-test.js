import ws from 'ws';
import LiveApi from '../LiveApi';

const token = 'if9yO8qFuejRCDk';

describe('payment', async () => {
    const liveApi = new LiveApi({ websocket: ws });
    await liveApi.authorize(token);

    it('should be able to get cashierLock status', async () => {
		const response = await liveApi.getCashierLockStatus();
		expect(response.cashier_password).toBeTruthy();
    });

    it.skip('should be able to Lock Cashier', () => {
		expect(() =>
            liveApi.setCashierLock({ lock_password: '12345768' }))
        .not.toThrow();
    });

    it.skip('should be able to Unlock Cashier', () => {
		expect(() =>
            liveApi.setCashierLock({ unlock_password: '12345768' }))
        .not.toThrow();
    });

    it.skip('should return server error when wrong verification_code is provided', async () => {
		await liveApi.authorize(token);
        const response = await liveApi.withdrawToPaymentAgent({
            paymentagent_loginid: 'CR100001',
            currency: 'USD',
            amount: 1000,
            verification_code: 'Ag76JL9+B/g=',
        });
        expect(response.name).toEqual('Error');
        expect(response.message).toContain('Input validation failed: verification_code');
    });

	it.skip('should be able to call withdrawToPaymentAgent function without an issue', () => {
        expect(() =>
            liveApi.withdrawToPaymentAgent({
                paymentagent_loginid: 'CR100001',
                currency: 'USD',
                amount: 1000,
                verification_code: 'Ag76JL9+B/g=',
            })
		).not.toThrow();
    });

    it.skip('should throw PaymentAgentTransferError where payment agent is not available', async () => {
		await liveApi.authorize(token);
        const response = await liveApi.paymentAgentTransfer({
            transfer_to: 'CR100001',
            currency: 'USD',
            amount: 1000,
        });
        expect(response.message).toContain('Payment Agents are not available on this site.');
    });

    it.skip('should allow payment agent perform transfer', () => {
        expect(() =>
            liveApi.paymentAgentTransfer({
            transfer_to: 'CR100001',
            currency: 'USD',
            amount: 1000,
        })).not.toThrow();
    });

    it.skip('can perform transfer between MLF and MLT accounts', () =>
        expect(() =>
            liveApi.transferBetweenAccounts({
                account_from: 'MF3642',
                account_to: 'MLT78079',
                currency: 'EUR',
                amount: 1000,
            })
		).not.toThrow()
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

        expect(response.transfer_between_accounts).toBeTruthy();
    });
});
