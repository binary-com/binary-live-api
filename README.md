# binary-live-api

[![Build Status](https://travis-ci.org/binary-com/binary-live-api.svg?branch=master)](https://travis-ci.org/binary-com/binary-live-api)

[![Coverage Status](https://coveralls.io/repos/github/binary-com/binary-live-api/badge.svg?branch=master)](https://coveralls.io/github/binary-com/binary-live-api?branch=master)

This library is a high-level abstraction over the [Binary.com Websockets API](https://developers.binary.com)

## 

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

Alternatively, you can add the library to your project with the following link: [https://liveapi.binary.com/binary-live-api.js](https://liveapi.binary.com/binary-live-api.js) - or to fix to a specific version, put the version number in the URL as follows: [https://liveapi.binary.com/27.0.0/binary-live-api.js](https://liveapi.binary.com/27.0.0/binary-live-api.js)

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

## Experimental feature (Not for production)
support [RxJs](https://github.com/Reactive-Extensions/RxJS)

User can opt to use observables API instead of Promise API by passing `useRx = true` in constructor, like below

```
var api = new LiveApi({ useRx: true });
api.ping()      // return Observable, instead of Promise
```

No more global events ~!! as Stream is now modelled as observables, you can pass it around, instead of listening to global event.
This will allow better composition of streams, right now it only include rx.lite, thus not all observables operator are supported,
all supported operators can be check [here](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/libraries/lite/rx.lite.md)

Example

```
var api = new LiveApi({ useRx: true });
var r100TickStream = api.subscribeToTicks('R_100');

// silly example, but to illustrate you can now operate on them independently
var epochs = r100TickStream.map(function(json){return json.tick.epoch});
var quotes = r100TickStream.map(function(json){return json.tick.quote});

```

## To deploy as library on gh pages
run `gulp deploy` to deploy library to origin/gh-pages

run `gulp deploy-prod` to deploy library to upstream/gh-pages
