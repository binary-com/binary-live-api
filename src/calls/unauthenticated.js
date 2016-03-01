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
    // TODO: this.token = token;
    authorize: token,
});

export const getContractsForSymbol = (symbol) => ({
    contracts_for: symbol,
});

export const unsubscribeFromTick = symbol => ({
    // TODO: delete this.subscriptions.ticks[symbol];
    forget: symbol,
});

export const unsubscribeFromTicks = (symbols) =>
    symbols.forEach(this.unsubscribeFromTick);

export const unsubscribeByID = id => ({
    forget: id,
});

export const unsubscribeFromAllTicks = () => ({
    // TODO: this.subscriptions.ticks = {};
    forget_all: 'ticks',
});

export const unsubscribeFromAllProposals = () => ({
    // TODO: this.subscriptions.priceProposal = null;
    forget_all: 'proposal',
});

export const unsubscribeFromAllPortfolios = () => ({
    // TODO: this.subscriptions.portfolio = false;
    forget_all: 'portfolio',
});

export const unsubscribeFromAlProposals = () => ({
    // TODO: this.subscriptions = noSubscriptions();
    forget_all: 'proposal_open_contract',
});

export const getLandingCompany = (landingCompany) => ({
    landing_company: landingCompany,
});

export const getLandingCompanyDetails = (landingCompany) => ({
    landing_company_details: landingCompany,
});

export const createVirtualAccount = (options) => ({
    new_account_virtual: 1,
    ...options,
});

export const ping = () => ({
    ping: 1,
});

export const getPaymentAgentsForCountry = (countryCode) => ({
    paymentagent_list: countryCode,
});

export const getPayoutCurrencies = () => ({
    payout_currencies: 1,
});

export const getPriceProposalForContract = (options) => ({
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

export const getStatesForCountry = (countryCode) => ({
    states_list: countryCode,
});

export const subscribeToTick = symbol => ({
    // TODO: this.subscriptions.ticks[symbol] = true;
    ticks: symbol,
});

export const subscribeToTicks = symbols => ({
    // TODO: symbols.forEach(s => this.subscriptions.ticks[s] = true);
    ticks: symbols,
});

export const getTickHistory = (symbol, options = {}) => ({
    ticks_history: symbol,
    ...options,
});

export const getServerTime = () => ({
    time: 1,
});

export const getTradingTimes = (date = new Date()) => ({
    trading_times: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
});

export const verifyEmail = (email, type) => ({
    verify_email: email,
    type,
});

// TODO: website_status
