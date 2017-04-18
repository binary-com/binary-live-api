export const buyContract = (contractId: number, price: number) => ({
    buy: contractId,
    price,
});

export const buyContractParams = (params: Object, price: number) => ({
    buy       : 1,
    price,
    parameters: params,
});

export const sellContract = (contractId: number, price: number) => ({
    sell: contractId,
    price,
});

export const sellExpiredContracts = () => ({
    sell_expired: 1,
});

export const topUpVirtualAccount = () => ({
    topup_virtual: 1,
});
