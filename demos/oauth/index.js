console.log(window['binary-live-api']);
const { oauthUrl, parseOAuthResponse } = window['binary-live-api'].OAuth;

const url = oauthUrl('id-ud5PPOTeBcEnkam7ArXIc4AO9e9gw');

window.location = url;

// const accounts = parseOAuthResponse(returnUrl);
