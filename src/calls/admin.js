export const deleteApiToken = (token: string) => ({
    api_token: 1,
    delete_token: token,
});

export const getApiTokens = () => ({
    api_token: 1,
});

export const createApiToken = (token: string, scopes: string[]) => ({
    api_token: 1,
    new_token: token,
    new_token_scopes: scopes,
});

export const changePassword = (oldPassword: string, newPassword: string) => ({
    change_password: 1,
    old_password: oldPassword,
    new_password: newPassword,
});

export const registerApplication = (options: Object) => ({
    app_register: 1,
    ...options,
});

export const getAllAppList = () => ({
    app_list: 1,
});

export const getAppslistById = (appid: number) => ({
    app_get: appid,
});

export const deleteApplication = (appid: number) => ({
    app_delete: appid,
});

export const createRealAccountMaltaInvest = (options: Object) => ({
    new_account_maltainvest: 1,
    ...options,
});

export const createRealAccount = (options: Object) => ({
    new_account_real: 1,
    ...options,
});

export const setAccountCurrency = (currency: string) => ({
    set_account_currency: currency,
});

export const setSelfExclusion = (options: Object) => ({
    set_self_exclusion: 1,
    ...options,
});

export const setAccountSettings = (options: Object) => ({
    set_settings: 1,
    ...options,
});

export const setTnCApproval = () => ({
    tnc_approval: 1,
});
