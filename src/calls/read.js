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

export const getStatement = (options = {}) => ({
    statement: 1,
    ...options,
});

export const getPortfolio = () => ({
    portfolio: 1,
});

export const getProfitTable = (options = {}) => ({
    profit_table: 1,
    ...options,
});

export const subscribeToBalance = () => ({
    balance: 1,
    subscribe: 1,
});

export const subscribeToOpenContract = contractId => ({
    proposal_open_contract: 1,
    subscribe: 1,
    fmd_id: contractId,
});

export const subscribeToAllOpenContracts = () => ({
    proposal_open_contract: 1,
    subscribe: 1,
});

export const subscribeToTransactions = () => ({
    transaction: 1,
    subscribe: 1,
});
