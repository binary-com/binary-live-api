export const getAccountLimits = () => ({
    get_limits: 1,
});

export const getAccountSettings = () => ({
    get_settings: 1,
});

export const getAccountStatus = () => ({
    get_account_status: 1,
});

export const getSelfExclusion = () => ({
    get_self_exclusion: 1,
});

export const logOut = () => ({
    logout: 1,
});

export const getStatement = (options: Object) => ({
    statement: 1,
    ...options,
});

export const getPortfolio = () => ({
    portfolio: 1,
});

export const getProfitTable = (options: Object) => ({
    profit_table: 1,
    ...options,
});

export const getRealityCheckSummary = () => ({
    reality_check: 1,
});

export const subscribeToBalance = () => ({
    balance: 1,
    subscribe: 1,
});

export const unsubscribeFromBalance = () => ({
    balance: 1,
    subscribe: 0,
});

export const subscribeToOpenContract = (contractId: number) => ({
    proposal_open_contract: 1,
    subscribe: 1,
    contract_id: contractId,
});

export const getContractInfo = (contractId: number) => ({
    proposal_open_contract: 1,
    contract_id: contractId,
});

export const subscribeToAllOpenContracts = () => ({
    proposal_open_contract: 1,
    subscribe: 1,
});

export const unsubscribeFromAllOpenContracts = () => ({
    proposal_open_contract: 1,
    subscribe: 0,
});

export const subscribeToTransactions = () => ({
    transaction: 1,
    subscribe: 1,
});

export const unsubscribeFromTransactions = () => ({
    transaction: 1,
    subscribe: 0,
});
