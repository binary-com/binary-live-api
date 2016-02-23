// Unauthenticated Calls

const getActiveSymbolsBrief = () => ({
    active_symbols: 'brief',
});

const getActiveSymbolsFull = () => ({
    active_symbols: 'full',
});

const getAssetIndex = () => ({
    asset_index: 1,
});

const getContractsForSymbol = (symbol) => ({
    contracts_for: symbol,
});

const getLandingCompany = (landingCompany) => ({
    landing_company: landingCompany,
});

const getLandingCompanyDetails = (landingCompany) => ({
    landing_company_details: landingCompany,
});

const createVirtualAccount = (options) => ({
    new_account_virtual: 1,
    ...options,
});

const getPayoutCurrencies = () => ({
    payout_currencies: 1,
});

const ping = () => ({
    ping: 1,
});

const getServerTime = () => ({
    time: 1,
});

const getPaymentAgentsForCountry = (countryCode) => ({
    paymentagent_list: countryCode,
});

const getResidences = () => ({
    residence_list: 1,
});

const getStatesForCountry = (countryCode) => ({
    states_list: countryCode,
});

const getTickHistory = (symbol, options = {}) => ({
    ticks_history: symbol,
    ...options,
});

const getTradingTimes = (date = new Date()) => ({
    trading_times: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
});

const getPriceProposalForContract = (options) =>({
    proposal: 1,
    ...options,
});

const verifyEmail = (email, type) =>({
    verify_email: email,
    type: type,
});


// Unathenticated Streams

const subscribeToTick = (symbol) => ({ // this.subscriptions.ticks[symbol] = true;
    ticks: symbol,
});

const subscribeToTicks = (symbols) => ({ // symbols.forEach(s => this.subscriptions.ticks[s] = true);
    ticks: symbols,
});

const subscribeToPriceForContractProposal = options => ({
    proposal: 1,
    subscribe: 1,
    ...options,
});

const subscribeToBalance = () => ({
    balance: 1,
    subscribe: 1,
});

const subscribeToOpenContract = contractId => ({
    proposal_open_contract: 1,
    subscribe: 1,
    fmd_id: contractId,
});

const subscribeToAllOpenContracts = () => ({
    proposal_open_contract: 1,
    subscribe: 1,
});

const unsubscribeFromTick = symbol => ({ // delete this.subscriptions.ticks[symbol];
    forget: symbol,
});

const unsubscribeFromTicks = (symbols) =>
    symbols.forEach(this.unsubscribeFromTick);

const unsubscribeFromAllTicks = () => ({ // this.subscriptions.ticks = {};
    forget_all: 'ticks',
});

const unsubscribeFromAllProposals = () => ({ // this.subscriptions.priceProposal = null;
    forget_all: 'proposal',
});

const unsubscribeByID = id => ({
    forget: id,
});

const unsubscribeFromAllPortfolios = () => ({ // this.subscriptions.portfolio = false;
    forget_all: 'portfolio',
});

const unsubscribeFromAlProposals = () => ({ // this.subscriptions = noSubscriptions();
    forget_all: 'proposal_open_contract',
});


// Authenticated Calls (no side effects)


const authorize = token => ({ // this.token = token;
    authorize: token,
});

const getAccountLimits = () => ({
    get_limits: 1,
});

const getAccountSettings = () => ({
    get_settings: 1,
});

const getAccountStatus = () => ({
    get_account_status: 1,
});

const getSelfExclusion = () => ({
    get_self_exclusion: 1,
});

const getCashierLockStatus = () => ({
    cashier_password: 1,
});

const getStatement = (options = {}) => ({
    statement: 1,
    ...options,
});

const getPortfolio = () => ({
    portfolio: 1,
});

const getProfitTable = (options = {}) => ({
    profit_table: 1,
    ...options,
});

// Authenticated Calls (with side effects)

const buyContract = (contractId, price) => ({
    buy: contractId,
    price,
});

const sellContract = (contractId, price) =>({
    sell: contractId,
    price,
});

const createRealAccount = (options) => ({
    new_account_real: 1,
    ...options,
});

const createRealAccountMaltaInvest = (options) => ({
    new_account_maltainvest: 1,
    ...options,
});

const withdrawToPaymentAgent = (options) => ({
    paymentagent_withdraw: 1,
    ...options,
});

const paymentAgentTransfer = (options) => ({
    paymentagent_transfer: 1,
    ...options,
});

const setSelfExclusion = (options) => ({
    set_self_exclusion: 1,
    ...options,
});

const topUpVirtualAccount = () => ({
    topup_virtual: 1,
});

const setCashierLock = (options) => ({
    cashier_password: 1,
    ...options,
});

const changePassword = (options) => ({
    change_password: 1,
    ...options,
});

const setAccountSettings = (options) => ({
    set_settings: 1,
    ...options,
});
