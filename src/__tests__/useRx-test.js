import { Observable } from 'rx-lite';
import { expect } from 'chai';
import 'babel-polyfill';
import ws from 'ws';
import LiveApi from '../LiveApi';

describe('use rx', () => {
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
    })
});