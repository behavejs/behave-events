var BehaveEvents = require('../../dist/index');

describe('BehaveEvents', function() {
    beforeEach(function() {
        this.events = new BehaveEvents();
    });

    describe('.transaction()', function() {

        it('should be defined', function(done) {
            expect(this.events.transaction).toBeDefined();
            done();
        });

        it('should register a transaction', function(done) {
            var cb = function() {};
            this.events.transaction('test', cb);
            expect(this.events.__transactions.test).toBeDefined();
            expect(this.events.__transactions.test).toEqual(cb);
            done();
        });
    });

    describe('.transact()', function() {

        it('should be defined', function(done) {
            expect(this.events.transact).toBeDefined();
            done();
        });

        it('should call a registered transaction', function(done) {
            var spy = jasmine.createSpy('transaction');
            this.events.transaction('test', spy);
            this.events.transact('test');
            expect(spy).toHaveBeenCalled();
            done();
        });

        it('should return a promise', function(done) {
            var spy = jasmine.createSpy('transaction');
            this.events.transaction('test', spy);
            var promise = this.events.transact('test');
            expect(promise.then).toBeDefined();
            expect(promise.done).toBeDefined();
            expect(promise.fail).toBeDefined();
            done();
        });
    });

    describe('.stopTransacting()', function() {

        it('should be defined', function(done) {
            expect(this.events.stopTransacting).toBeDefined();
            done();
        });

        it('should remove a registered transaction', function(done) {
            this.events.transaction('test', function() {});
            expect(this.events.__transactions.test).toBeDefined();

            this.events.stopTransacting('test');
            expect(this.events.__transactions.test).not.toBeDefined();
            done();
        });
    });

    describe('.response()', function() {

        it('should be defined', function(done) {
            expect(this.events.response).toBeDefined();
            done();
        });

        it('should register a response', function(done) {
            var cb = function() {};
            this.events.response('test', cb);
            expect(this.events.__responses.test).toBeDefined();
            expect(this.events.__responses.test).toEqual(cb);
            done();
        });
    });

    describe('.request()', function() {

        it('should be defined', function(done) {
            expect(this.events.transact).toBeDefined();
            done();
        });

        it('should call a registered response', function(done) {
            var spy = jasmine.createSpy('transaction');
            this.events.response('test', spy);
            this.events.request('test');
            expect(spy).toHaveBeenCalled();
            done();
        });

        it('should return a value from response', function(done) {
            var cb = function() { return 'test'; };
            this.events.response('test', cb);
            var ret = this.events.request('test');
            expect(ret).toEqual('test');
            done();
        });
    });

    describe('.stopResponding()', function() {

        it('should be defined', function(done) {
            expect(this.events.stopResponding).toBeDefined();
            done();
        });

        it('should remove a registered response', function(done) {
            this.events.response('test', function() {});
            expect(this.events.__responses.test).toBeDefined();

            this.events.stopResponding('test');
            expect(this.events.__responses.test).not.toBeDefined();
            done();
        });
    });

    describe('.command()', function() {

        it('should be defined', function(done) {
            expect(this.events.command).toBeDefined();
            done();
        });

        it('should register a command', function(done) {
            var cb = function() {};
            this.events.command('test', cb);
            expect(this.events.__commands.test).toBeDefined();
            expect(this.events.__commands.test).toEqual(cb);
            done();
        });
    });

    describe('.execute()', function() {

        it('should be defined', function(done) {
            expect(this.events.execute).toBeDefined();
            done();
        });

        it('should call a registered command', function(done) {
            var spy = jasmine.createSpy('command');
            this.events.command('test', spy);
            this.events.execute('test');
            expect(spy).toHaveBeenCalled();
            done();
        });
    });

    describe('.stopExecuting()', function() {

        it('should be defined', function(done) {
            expect(this.events.stopExecuting).toBeDefined();
            done();
        });

        it('should remove a registered response', function(done) {
            this.events.command('test', function() {});
            expect(this.events.__commands.test).toBeDefined();

            this.events.stopExecuting('test');
            expect(this.events.__commands.test).not.toBeDefined();
            done();
        });
    });
});
