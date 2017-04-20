import LiveEvents from '../LiveEvents';

describe('LiveEvents', () => {
    let liveEvents;

    beforeEach(() => {
        liveEvents = new LiveEvents();
    });

    it('can create object', () => {
        expect(liveEvents).toBeTruthy();
    });

    it('can subscribe to events', () => {
        expect(() => liveEvents.on('message', () => {})).not.toThrow();
    });

    it('can emit events', () => {
        expect(() => liveEvents.emit('message', {})).not.toThrow();
    });

    it('can receive emitted events', done => {
        liveEvents.on('message', done);
        liveEvents.emit('message');
    });

    it('wildcard event handler should catch any event', done => {
        liveEvents.on('*', done);
        liveEvents.emit('message');
    });

    it('can have multiple handlers per message', done => {
        let handleCount = 0;
        const handler = () => {
            handleCount++;
            if (handleCount === 3) done();
        };
        liveEvents.on('message', handler);
        liveEvents.on('message', handler);
        liveEvents.on('message', handler);
        liveEvents.emit('message');
    });
});
