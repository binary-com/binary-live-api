import { LiveApi } from '../lib/';

var api = new LiveApi();
api.authorize('Ggq2liobTcQ53Rr1h43udQ3CsoJupSft3cuzgEo90ZBX2e8h');
api.getPortfolio();
api.events.on('portfolio', function(data) {
    console.log(data);
});
