export const getCashierLockStatus = () => ({
    cashier_password: 1,
});

export const setCashierLock = (options: Object) => ({
    cashier_password: 1,
    ...options,
});

export const withdrawToPaymentAgent = (options: Object) => ({
    paymentagent_withdraw: 1,
    ...options,
});

export const paymentAgentTransfer = (options: Object) => ({
    paymentagent_transfer: 1,
    ...options,
});

export const transferBetweenAccounts = (options: Object) => ({
    transfer_between_accounts: 1,
    ...options,
});
