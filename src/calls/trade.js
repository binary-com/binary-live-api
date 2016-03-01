export const buyContract = (contractId, price) => ({
    buy: contractId,
    price,
});

export const sellContract = (contractId, price) => ({
    sell: contractId,
    price,
});

export const sellExpiredContracts = () => ({
    sell_expired: 1,
});

export const topUpVirtualAccount = () => ({
    topup_virtual: 1,
});
