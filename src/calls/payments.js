export const getCashierLockStatus = () => ({
    cashier_password: 1,
});

export const setCashierLock = options => ({
    cashier_password: 1,
    ...options,
});

export const withdrawToPaymentAgent = options => ({
    paymentagent_withdraw: 1,
    ...options,
});

export const paymentAgentTransfer = options => ({
    paymentagent_transfer: 1,
    ...options,
});

export const transferBetweenAccounts = options => ({
    paymentagent_transfer: 1,
    ...options,
});
