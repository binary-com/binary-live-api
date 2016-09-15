export const buyContract = (contractId: number, price: number): Object => ({
    buy: contractId,
    price,
});

export const sellContract = (contractId: number, price: number): Object => ({
    sell: contractId,
    price,
});

export const sellExpiredContracts = (): Object => ({
    sell_expired: 1,
});

export const topUpVirtualAccount = (): Object => ({
    topup_virtual: 1,
});
