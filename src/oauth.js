const rootUrl = 'https://rmg-prod.apigee.net/v1/binary';
const clientId = 'ldqAtjU9Vj8xojmK0awwOerdIDvQlyWH';
const state = 'fjcapp01';
const authUrl = `${rootUrl}/oauth/authorize?response_type=token&client_id=${clientId}&scope=S110&state=${state}`;
const renewUrl = `${rootUrl}/oauth/refresh_accesstoken`;

export default class OAuth {

    authorize() {

        //let authWindow = window.open(authUrl, 'clearcache=yes,clearsessioncache=yes,location=no,toolbar=no');

        window.addEventListener('loadstart', function(e) {

            alert('zup!');

            const url = e.originalEvent.url;
            const matches = /[&\?]access_token=(.+)$/.exec(url);
            const accessToken = matches[1];

            console.log(url, matches, accessToken);

            if (!accessToken) return;

            window.localStorage.setItem('access-token', accessToken);
            authWindow.close();
        });

        window.location = authUrl;

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
