import { Observable } from 'rx-lite';
import { expect } from 'chai';
import 'babel-polyfill';
import ws from 'ws';
import LiveApi from '../LiveApi';


describe('use rx', () => {
    const apiWithRX = new LiveApi({ websocket: ws, useRx: true });

    it('should return observable for any call', cb => {
        const obs = apiWithRX.ping();

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
        obs.connect();
    });

    // simple example
    it('should make stream handling easier', cb => {
        const stream = apiWithRX.subscribeToTick('R_100');

        const avgPerTick = stream.scan((avg, json, idx) => {
            const currentVal = +json.tick.quote;
            const newAvg = ((avg * idx) + currentVal) / (idx + 1);
            return newAvg;
        }, 0);

        avgPerTick.take(3).subscribe(avg => {
            expect(avg).to.be.a('number');
        }, () => {}, () => cb());
        stream.connect();
    });
});
