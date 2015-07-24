import fetch from 'whatwg-fetch';
import api from './RestApi';

const clientId = 'ldqAtjU9Vj8xojmK0awwOerdIDvQlyWH';
const state = 'fjcapp01';

export default class OAuth {

    static authUrl = `${api.rootUrl}/oauth/authorize?response_type=token&client_id=${clientId}&scope=S110&state=${state}`;
    static renewUrl = `${api.rootUrl}/oauth/refresh_accesstoken`;

    authorize() {

        let authWindow = window.open(this.authUrl, '_blank', 'clearcache=yes,clearsessioncache=yes,location=no');

        authWindow.addEventListener('load', function(e) {
            let url = e.originalEvent.url;
            let matches = /[&\?]access_token=(.+)$/.exec(url);
            let accessToken = matches[1];

            if (!accessToken) return;

            window.localStorage.setItem('access-token', accessToken);
            authWindow.close();
        });
    }

    renewToken() {
        // Authorization: Basic ENCODED
        return fetch(`${rootUrl}/markets/`, {
            method: 'post',
            body: {
                "grant_type": "refresh_token",
                "refresh_token": "REFRESH_TOKEN"
            }
        });
    }
}
