// import { Observable } from 'rx-lite';
import 'babel-polyfill';
import websocket from 'ws';
import LiveApi from '../LiveApi';

describe('use rx', () => {
    const apiWithRX = new LiveApi({ websocket, useRx: true, appId: 1089 });

    it('should return observable for any call', callback => {
        const obs = apiWithRX.ping();

        obs.subscribe(
            next => {
                expect(next.msg_type).toEqual('ping');
            },
            err => console.log(err), // eslint-disable-line no-console
            callback
        );
        obs.connect();
    });

    // simple example
    it('should make stream handling easier', callback => {
        const stream = apiWithRX.subscribeToTick('R_100');

        const avgPerTick = stream.scan((avg, json, idx) => {
            const currentVal = +json.tick.quote;
            const newAvg = (avg * idx + currentVal) / (idx + 1);
            return newAvg;
        }, 0);

        avgPerTick.take(2).subscribe(
            avg => {
                expect(typeof avg).toBe('number');
            },
            err => console.log(err), // eslint-disable-line no-console
            callback
        );
        stream.connect();
    });
});
