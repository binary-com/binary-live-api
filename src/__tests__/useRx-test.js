import { Observable } from 'rx-lite';
import { expect } from 'chai';
import 'babel-polyfill';
import ws from 'ws';
import LiveApi from '../LiveApi';

describe.only('use rx', () => {
    const apiWithRX = new LiveApi({ websocket: ws, appId: 1089, useRx: true });

    it('should return observable for any call', cb => {
        const obs = apiWithRX.ping();

        obs.connect();
        obs.subscribe(
            next => {
                expect(next.msg_type).to.equal('ping');
            },
            err => {

            },
            () => {
                cb();
            }
        );
    });

    // simple example
    it('should make stream handling easier', cb => {
        const stream = apiWithRX.subscribeToTick('R_100');
        stream.connect();

        stream.subscribe(avg => console.log(avg), () => {}, () => cb());

        const avgPerTick = stream.scan((avg, json, idx) => {
            console.log(json);
            const currentVal = json.tick.quote;
            const newAvg = (avg * (idx - 1) + currentVal) / idx;

            return newAvg;
        }, 0);

        avgPerTick.take(3).subscribe(avg => console.log(avg), () => {}, () => cb());
    });
});