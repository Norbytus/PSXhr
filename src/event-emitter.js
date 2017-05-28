'use strict';

class EventEmitter {

    constructor() {

        this._queue = [];

    }

    emit(...argv) {

        return this._queue.every( handler => {

            return handler(...argv) === false ? false : true;

        });

    }

    push(handler) {

        this._queue.push(handler);
        return this;

    }

    clear() {

        this._queue = [];

    }

}

export default EventEmitter;
