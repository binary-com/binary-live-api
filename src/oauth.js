import * as api from './api';

let clientId = 'ldqAtjU9Vj8xojmK0awwOerdIDvQlyWH';
let state = 'fjcapp01';

let authUrl = `${api.rootUrl}/oauth/authorize?response_type=token&client_id=${clientId}&scope=S110&state=${state}`;
let renewUrl = `${api.rootUrl}/oauth/refresh_accesstoken`;

export function authorize() {

    let authWindow = window.open(authUrl, '_blank', 'clearcache=yes,clearsessioncache=yes,location=no');

    authWindow.addEventListener('load', function(e) {
        let url = e.originalEvent.url;
        let matches = /[&\?]access_token=(.+)$/.exec(url);
        let accessToken = matches[1];

        if (!accessToken) return;

        window.localStorage.setItem('access-token', accessToken);
        authWindow.close();
    });
}

export function renewToken() {
    // Authorization: Basic ENCODED
    return fetch(`${rootUrl}/markets/`, {
        method: 'post',
        body: {
            "grant_type": "refresh_token",
            "refresh_token": "REFRESH_TOKEN"
        }
    });
}
