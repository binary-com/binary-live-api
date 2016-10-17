# binary-live-api

[![Build Status](https://travis-ci.org/binary-com/binary-live-api.svg?branch=master)](https://travis-ci.org/binary-com/binary-live-api)

[![Coverage Status](https://coveralls.io/repos/github/binary-com/binary-live-api/badge.svg?branch=master)](https://coveralls.io/github/binary-com/binary-live-api?branch=master)

This library is a high-level abstraction over the [Binary.com Websockets API](https://developers.binary.com)

Note: the master branch represents the latest version of the API. For previous versions (e.g. v2) please see the relevant branches.

## Features

1. Promise based, all network calls return a promise that is resolved when response is received, request response mapping is handled out of the box
2. Automatic reconnect when disconnection, including resubscribe to subscription made before disconnection

## Usage in the Browser

```
var api = new LiveApi();
api.authorize('yourtoken');
api.getPortfolio();
api.events.on('portfolio', function(data) {
    // do stuff with portfolio data
});
```

## Usage From Node

Install a WebSockets library like 'ws'

```
npm init
npm install ws --save
npm install binary-live-api --save
```

Require the library and then pass it to LiveApi's constructor.

```
var ws = require('ws');
var LiveApi = require('binary-live-api').LiveApi;

var api = new LiveApi({ websocket: ws });
api.authorize('yourtoken');
api.getPortfolio();
api.events.on('portfolio', function(data) {
    // do stuff with portfolio data
});
```

For all available calls, please check [here](docs/networkcalls.md)

## To deploy as library on gh pages
run `gulp deploy` to deploy library to origin/gh-pages

run `gulp deploy-prod` to deploy library to upstream/gh-pages
