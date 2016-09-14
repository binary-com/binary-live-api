export const getCashierLockStatus = (): Object => ({
    cashier_password: 1,
});

export const setCashierLock = (options: Object): Object => ({
    cashier_password: 1,
    ...options,
});

export const withdrawToPaymentAgent = (options: Object): Object => ({
    paymentagent_withdraw: 1,
    ...options,
});

export const paymentAgentTransfer = (options: Object): Object => ({
    paymentagent_transfer: 1,
    ...options,
});

export const transferBetweenAccounts = (options: Object): Object => ({
    transfer_between_accounts: 1,
    ...options,
});
