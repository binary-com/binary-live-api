export const getActiveSymbolsBrief = (): Object => ({
    active_symbols: 'brief',
});

export const getActiveSymbolsFull = (): Object => ({
    active_symbols: 'full',
});

export const getAssetIndex = (): Object => ({
    asset_index: 1,
});

export const authorize = (token: string): Object => ({
    authorize: token,
});

export const getContractsForSymbol = (symbol: string): Object => ({
    contracts_for: symbol,
});

export const unsubscribeFromTick = (symbol: string): Object => ({
    forget: symbol,
});

export const unsubscribeFromTicks = (symbols: string[]): Object => ({
    forget: symbols,
});

export const unsubscribeByID = (id: number): Object => ({
    forget: id,
});

export const unsubscribeFromAllTicks = (): Object => ({
    forget_all: 'ticks',
});

export const unsubscribeFromAllProposals = (): Object => ({
    forget_all: 'proposal',
});

export const unsubscribeFromAllPortfolios = (): Object => ({
    forget_all: 'portfolio',
});

export const unsubscribeFromAllProposalsOpenContract = (): Object => ({
    forget_all: 'proposal_open_contract',
});

export const getLandingCompany = (landingCompany: string): Object => ({
    landing_company: landingCompany,
});

export const getLandingCompanyDetails = (landingCompany: string): Object => ({
    landing_company_details: landingCompany,
});

export const createVirtualAccount = (options: Object): Object => ({
    new_account_virtual: 1,
    ...options,
});

export const ping = (): Object => ({
    ping: 1,
});

export const getPaymentAgentsForCountry = (countryCode: string): Object => ({
    paymentagent_list: countryCode,
});

export const getPayoutCurrencies = (): Object => ({
    payout_currencies: 1,
});

export const getPriceProposalForContract = (options: Object): Object => ({
    proposal: 1,
    ...options,
});

export const subscribeToPriceForContractProposal = (options: Object): Object => ({
    proposal: 1,
    subscribe: 1,
    ...options,
});

export const getResidences = (): Object => ({
    residence_list: 1,
});

export const getStatesForCountry = (countryCode: string): Object => ({
    states_list: countryCode,
});

export const subscribeToTick = (symbol: string): Object => ({
    ticks: symbol,
});

export const subscribeToTicks = (symbols: string[]): Object => ({
    ticks: symbols,
});

export const getTickHistory = (symbol: string, options: Object): Object => ({
    ticks_history: symbol,
    ...(options || { end: 'latest' }),
});

export const getCandles = (symbol: string, options: Object): Object => ({
    ticks_history: symbol,
    style: 'candles',
    ...(options || { end: 'latest' }),
});

export const getCandlesForLastNDays = (symbol: string, ndays: number): Object => ({
    ticks_history: symbol,
    style: 'candles',
    start: Math.floor(Date.now() / 1000) - (ndays - 1) * 60 * 60 * 24,
    end: 'latest',
    granularity: 60 * 60 * 24,
    count: 30,
});

export const getServerTime = (): Object => ({
    time: 1,
});

export const getTradingTimes = (date: Date): Object => ({
    trading_times: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
});

export const verifyEmail = (email: string, type: string): Object => ({
    verify_email: email,
    type,
});

export const getWebsiteStatus = (): Object => ({
    website_status: 1,
});
