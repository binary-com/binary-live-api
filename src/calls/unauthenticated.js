export const getActiveSymbolsBrief = () => ({
    active_symbols: 'brief',
});

export const getActiveSymbolsFull = () => ({
    active_symbols: 'full',
});

export const getAssetIndex = () => ({
    asset_index: 1,
});

export const authorize = (token: string) => ({
    authorize: token,
});

export const getContractsForSymbol = (symbol: string) => ({
    contracts_for: symbol,
});

export const unsubscribeFromTick = (symbol: string) => ({
    forget: symbol,
});

export const unsubscribeFromTicks = (symbols: string[]) => ({
    forget: symbols,
});

export const unsubscribeByID = (id: number) => ({
    forget: id,
});

export const unsubscribeFromAllTicks = () => ({
    forget_all: 'ticks',
});

export const unsubscribeFromAllCandles = () => ({
    forget_all: 'candles',
});

export const unsubscribeFromAllProposals = () => ({
    forget_all: 'proposal',
});

export const unsubscribeFromAllPortfolios = () => ({
    forget_all: 'portfolio',
});

export const unsubscribeFromAllProposalsOpenContract = () => ({
    forget_all: 'proposal_open_contract',
});

export const getLandingCompany = (landingCompany: string) => ({
    landing_company: landingCompany,
});

export const getLandingCompanyDetails = (landingCompany: string) => ({
    landing_company_details: landingCompany,
});

export const createVirtualAccount = (options: Object) => ({
    new_account_virtual: 1,
    ...options,
});

export const ping = () => ({
    ping: 1,
});

export const getPaymentAgentsForCountry = (countryCode: string) => ({
    paymentagent_list: countryCode,
});

export const getPayoutCurrencies = () => ({
    payout_currencies: 1,
});

export const getPriceProposalForContract = (options: Object) => ({
    proposal: 1,
    ...options,
});

export const subscribeToPriceForContractProposal = (options: Object) => ({
    proposal: 1,
    subscribe: 1,
    ...options,
});

export const getResidences = () => ({
    residence_list: 1,
});

export const getStatesForCountry = (countryCode: string) => ({
    states_list: countryCode,
});

export const subscribeToTick = (symbol: string) => ({
    ticks: symbol,
});

export const subscribeToTicks = (symbols: string[]) => ({
    ticks: symbols,
});

export const getTickHistory = (symbol: string, options: Object) => ({
    ticks_history: symbol,
    ...(options || { end: 'latest' }),
});

export const getCandles = (symbol: string, options: Object) => ({
    ticks_history: symbol,
    style: 'candles',
    ...(options || { end: 'latest' }),
});

export const getCandlesForLastNDays = (symbol: string, ndays: number) => ({
    ticks_history: symbol,
    style: 'candles',
    start: Math.floor(Date.now() / 1000) - (ndays - 1) * 60 * 60 * 24,
    end: 'latest',
    granularity: 60 * 60 * 24,
    count: 30,
});

export const getServerTime = () => ({
    time: 1,
});

export const getTradingTimes = (date: Date) => ({
    trading_times: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
});

export const verifyEmail = (email: string, type: string) => ({
    verify_email: email,
    type,
});

export const getWebsiteStatus = () => ({
    website_status: 1,
});
