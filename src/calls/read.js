export const getAccountLimits = (): Object => ({
    get_limits: 1,
});

export const getAccountSettings = (): Object => ({
    get_settings: 1,
});

export const getAccountStatus = (): Object => ({
    get_account_status: 1,
});

export const getSelfExclusion = (): Object => ({
    get_self_exclusion: 1,
});

export const logOut = (): Object => ({
    logout: 1,
});

export const getStatement = (options: Object): Object => ({
    statement: 1,
    ...options,
});

export const getPortfolio = (): Object => ({
    portfolio: 1,
});

export const getProfitTable = (options: Object): Object => ({
    profit_table: 1,
    ...options,
});

export const getRealityCheckSummary = (): Object => ({
    reality_check: 1,
});

export const subscribeToBalance = (): Object => ({
    balance: 1,
    subscribe: 1,
});

export const unsubscribeFromBalance = (): Object => ({
    balance: 1,
    subscribe: 0,
});

export const subscribeToOpenContract = (contractId: number): Object => ({
    proposal_open_contract: 1,
    subscribe: 1,
    contract_id: contractId,
});

export const getContractInfo = (contractId: number): Object => ({
    proposal_open_contract: 1,
    contract_id: contractId,
});

export const subscribeToAllOpenContracts = (): Object => ({
    proposal_open_contract: 1,
    subscribe: 1,
});

export const unsubscribeFromAllOpenContracts = (): Object => ({
    proposal_open_contract: 1,
    subscribe: 0,
});

export const subscribeToTransactions = (): Object => ({
    transaction: 1,
    subscribe: 1,
});

export const unsubscribeFromTransactions = (): Object => ({
    transaction: 1,
    subscribe: 0,
});
