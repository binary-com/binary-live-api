var LiveData = (function () {
    'use strict';

    var messageFunc = function(data) {
//        console.log(data);
    };

    LiveApi.init();

    PubSub.on('message', messageFunc);

    LiveApi.send({portfolio:1});
    LiveApi.send({offerings:{}});
})();
