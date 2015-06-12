var LiveData = (function () {
    'use strict';

    LiveEvents.on('*', function(data) {
        console.log(data);
    });

    var init = function () {
        LiveApi.init();
        LiveApi.send({ portfolio: 1 });
        LiveApi.send({ offerings: {} });
    };

    return {
        init: init
    };
})();
