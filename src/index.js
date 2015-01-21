import EventEmitter from 'events';
import {defer} from 'Q';

class BehaveEvents extends EventEmitter {
    constructor() {
        super(...arguments);

        this.__transactions = {};
        this.__responses = {};
        this.__commands = {};
    }

    transaction(id, fn) {
        if (this.__transactions[id]) throw new Error('duplicate transactions!');
        if (typeof fn !== 'function') throw new Error('handler must be a function!');
        this.__transactions[id] = fn;
    }

    transact(id, opts={}) {
        if (!this.__transactions[id]) return;
        let deferred = defer();
        this.__transactions[id](opts, deferred.resolve, deferred.reject);
        return deferred.promise;
    }

    stopTransacting(id) {
        delete this.__transactions[id];
    }

    response(id, fn) {
        if (this.__responses[id]) throw new Error('duplicate responses!');
        if (typeof fn !== 'function') throw new Error('handler must be a function!');
        this.__responses[id] = fn;
    }

    request(id) {
        if (!this.__responses[id]) return;
        return this.__responses[id]();
    }

    stopResponding(id) {
        delete this.__responses[id];
    }

    command(id, fn) {
        if (this.__commands[id]) throw new Error('duplicate commands!');
        if (typeof fn !== 'function') throw new Error('handler must be a function!');
        this.__commands[id] = fn;
    }

    execute(id, opts={}) {
        if (!this.__commands[id]) return;
        this.__commands[id](opts);
    }

    stopExecuting(id) {
        delete this.__commands[id];
    }
}

export default BehaveEvents;
