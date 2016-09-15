export const deleteApiToken = (token: string): Object => ({
    api_token: 1,
    delete_token: token,
});

export const getApiTokens = (): Object => ({
    api_token: 1,
});

export const createApiToken = (token: string, scopes: string[]): Object => ({
    api_token: 1,
    new_token: token,
    new_token_scopes: scopes,
});

export const changePassword = (oldPassword: string, newPassword: string): Object => ({
    change_password: 1,
    old_password: oldPassword,
    new_password: newPassword,
});

export const registerApplication = (options: Object): Object => ({
    app_register: 1,
    ...options,
});

export const getAllAppList = (): Object => ({
    app_list: 1,
});

export const getAppslistById = (appid: number): Object => ({
    app_get: appid,
});

export const deleteApplication = (appid: number): Object => ({
    app_delete: appid,
});

export const createRealAccountMaltaInvest = (options: Object): Object => ({
    new_account_maltainvest: 1,
    ...options,
});

export const createRealAccount = (options: Object): Object => ({
    new_account_real: 1,
    ...options,
});

export const setAccountCurrency = (currency: string): Object => ({
    set_account_currency: currency,
});

export const setSelfExclusion = (options: Object): Object => ({
    set_self_exclusion: 1,
    ...options,
});

export const setAccountSettings = (options: Object): Object => ({
    set_settings: 1,
    ...options,
});

export const setTnCApproval = (): Object => ({
    tnc_approval: 1,
});
