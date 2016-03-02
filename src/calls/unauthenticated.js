export const getActiveSymbolsBrief = () => ({
    active_symbols: 'brief',
});

export const getActiveSymbolsFull = () => ({
    active_symbols: 'full',
});

export const getAssetIndex = () => ({
    asset_index: 1,
});

export const authorize = token => ({
    authorize: token,
});

export const getContractsForSymbol = symbol => ({
    contracts_for: symbol,
});

export const unsubscribeFromTick = symbol => ({
    forget: symbol,
});

export const unsubscribeFromTicks = symbols =>
    symbols.forEach(this.unsubscribeFromTick);

export const unsubscribeByID = id => ({
    forget: id,
});

export const unsubscribeFromAllTicks = () => ({
    forget_all: 'ticks',
});

export const unsubscribeFromAllProposals = () => ({
    forget_all: 'proposal',
});

export const unsubscribeFromAllPortfolios = () => ({
    forget_all: 'portfolio',
});

export const unsubscribeFromAlProposals = () => ({
    forget_all: 'proposal_open_contract',
});

export const getLandingCompany = landingCompany => ({
    landing_company: landingCompany,
});

export const getLandingCompanyDetails = landingCompany => ({
    landing_company_details: landingCompany,
});

export const createVirtualAccount = options => ({
    new_account_virtual: 1,
    ...options,
});

export const ping = () => ({
    ping: 1,
});

export const getPaymentAgentsForCountry = countryCode => ({
    paymentagent_list: countryCode,
});

export const getPayoutCurrencies = () => ({
    payout_currencies: 1,
});

export const getPriceProposalForContract = options => ({
    proposal: 1,
    ...options,
});

export const subscribeToPriceForContractProposal = options => ({
    proposal: 1,
    subscribe: 1,
    ...options,
});

export const getResidences = () => ({
    residence_list: 1,
});

export const getStatesForCountry = countryCode => ({
    states_list: countryCode,
});

export const subscribeToTick = symbol => ({
    ticks: symbol,
});

export const subscribeToTicks = symbols => ({
    ticks: symbols,
});

export const getTickHistory = (symbol, options) => ({
    ticks_history: symbol,
    ...(options || { end: 'latest' }),
});

export const getServerTime = () => ({
    time: 1,
});

export const getTradingTimes = date => ({
    trading_times: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
});

export const verifyEmail = (email, type) => ({
    verify_email: email,
    type,
});

export const getWebsiteStatus = () => ({
    website_status: 1,
});
