export const deleteApiToken = (token) => ({
    "api_token": "1",
    "delete_token": token,
});

export const getApiTokens => ({
    "api_token": "1",
});

export const createApiToken = (token, scopes) => ({
    "api_token": "1",
    "new_token": token,
    "new_token_scopes": scopes,
});

export const registerApplication = (options) => ({
    "app_register": 1,
    ...options,
});

export const getAllAppList => ({
    "app_list": 1,
});

export const getAppslistById = appid => ({
    "app_get": appid,
});

export const deleteApplication = appid => ({
    "app_delete": appid,
});

export const createRealAccountMaltaInvest = (options) => ({
    new_account_maltainvest: 1,
    ...options,
});

export const createRealAccount = (options) => ({
    new_account_real: 1,
    ...options,
});

export const setAccountCurrency = currency => ({
    "set_account_currency": currency,
});

export const setSelfExclusion = (options) => ({
    set_self_exclusion: 1,
    ...options,
});

export const setAccountSettings = options => ({
    set_settings: 1,
    ...options,
});

export const setTnCApproval => ({
    "tnc_approval": 1,
});
