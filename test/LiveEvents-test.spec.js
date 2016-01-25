import expect from 'expect';
import LiveEvents from '../src/LiveEvents';

describe('LiveEvents', () => {
    it('should create new object', () => {
        const actual = new LiveEvents();
        expect(actual).toExist();
    });

    it('should be able to subscribe to events', () => {
        const liveEvents = new LiveEvents();
        expect(() => liveEvents.on('message', () => {})).toNotThrow();
    });

    it('should be able to emit events', () => {
        const liveEvents = new LiveEvents();
        expect(() => liveEvents.emit('message', {})).toNotThrow();
    });

    it('should be able to receive emitted events', (done) => {
        const liveEvents = new LiveEvents();
        liveEvents.on('message', done);
        liveEvents.emit('message');
    });

    it('wildcard event handler should catch any event', (done) => {
        const liveEvents = new LiveEvents();
        liveEvents.on('*', done);
        liveEvents.emit('message');
    });

    it('should be able to have multiple handlers per message', (done) => {
        const liveEvents = new LiveEvents();
        let handleCount = 0;
        const handler = () => {
            handleCount++;
            if (handleCount == 3) done();
        }
        liveEvents.on('message', handler);
        liveEvents.on('message', handler);
        liveEvents.on('message', handler);
        liveEvents.emit('message');
    });
});
