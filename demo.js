LiveEvents.on('message', function(data) {
    console.log(data);
    //console.log(LiveData.Ticks.symbols());
    //console.log(LiveData.Ticks.current('R_100'));
    //console.log(LiveData.Ticks.history('R_100'));
});

LiveData.init();
