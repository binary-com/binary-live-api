// TODO: api_token

// TODO: app_register

// TODO: app_list

// TODO: app_get

// TODO: app_delete

export const createRealAccountMaltaInvest = (options) => ({
    new_account_maltainvest: 1,
    ...options,
});

export const createRealAccount = (options) => ({
    new_account_real: 1,
    ...options,
});

// TODO: set_account_currency

export const setSelfExclusion = (options) => ({
    set_self_exclusion: 1,
    ...options,
});

export const setAccountSettings = options => ({
    set_settings: 1,
    ...options,
});

// TODO: tnc_approval
