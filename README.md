# behave-events
An extended EventEmitter class with advanced event support (transactions, commands, and requests)

### Overview

`behave-events` is an event module that extends Node's `EventEmitter` class. It adds some common event patterns to the class, making it a fully featured event solution.

### EventEmitter

If you are unfamiliar with Node's [EventEmitter](http://nodejs.org/api/events.html) class, I would suggest reading the documentation!

___

### request / response / stopResponding

Easily set up reqres in your application with `response`, `request`, and `stopResponding`. Great for getting access to otherwise inaccessible state.

```javascript
let collection = [{a: 1}, {a: 2}, {a: 3}];

class MyClass {
    constructor() {
        this.events = new BehaveEvents();
        this.events.reponse('privateCollection', () => {
            return collection;
        });
    }

    // ...

    destroy() {
        this.events.stopResponding('privateCollection');
    }
}

// ...

var myClass = new MyClass();
this.events.request('privateCollection'); // => [{a: 1}, {a: 2}, {a: 3}]

// ...

myClass.destroy();
this.events.request('privateCollection'); // => undefined

```

___

### command / execute / stopExecuting

Pass off tasks off to other modules with `command`, `execute`, and `stopExecuting`. Great for things like queues and processing.

```javascript

import logger from './logger';
import Router from 'behave-router';

var router = new Router();

router.use((ctx) => {
    logger.execute('logAsync', {
        user: ctx.userId,
        route: ctx.canonicalPath
    });
});

// ...

```

___

### transaction / transact / stopTransacting

Sometimes you need to pass off work to another module, but you need confirmation that the task was completed. Some people use `request` for this, but I feel that violates the contract of `reqres`, with `transaction`, `transact`, and `stopTransacting` you can have a declarative way of registering transactions between your modules.

```javascript

import billing from './billing';
import logger from './logger';

billing.transact('payment', {
    userId: 'someid',
    amount: '100.00',
    memo: '$$$$'
})
.then(function(receipt) {
    logger.execute('logAsync', {
        type: 'payment',
        user: receipt.user,
        email: receipt.email,
        amount: receipt.amount,
        memo: receipt.memo
    });
})
.fail(function(err) {
    alert('AAAAGGGHHHH! No monies!! $$$$');
});

// ...

```

Release History:

- 0.1.0 Initial Release
