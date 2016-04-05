export const oauthUrl = appId =>
    `https://www.binary.com/oauth2/authorize?app_id=${appId}`;

export const oauthUrlWithLanguage = (appId, langCode) =>
    `https://www.binary.com/oauth2/authorize?app_id=${appId}&l=${langCode}`;

export const parseOAuthResponse = responseUrl => {
    const matcher = /acct\d=(\w+)&token\d=([\w-]+)/g;
    const urlParts = responseUrl.split('/redirect?');
    if (urlParts.length !== 2) throw new Error('Not a valid url');

    const params = urlParts[1].split(matcher);

    const accounts = [];

    for (let i = 1; i < params.length; i += 3) {
        accounts.push({
            account: params[i],
            token: params[i + 1],
        });
    }

    return accounts;
};
