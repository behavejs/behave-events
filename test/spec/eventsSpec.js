import BehaveEvents from '../../dist/index';

describe('BehaveEvents', () => {
    beforeEach(() => {
        this.events = new BehaveEvents();
    });

    describe('.transaction()', () => {

        it('should be defined', (done) => {
            expect(this.events.transaction).toBeDefined();
            done();
        });

        it('should register a transaction', (done) => {
            var cb = () => {};
            this.events.transaction('test', cb);
            expect(this.events.__transactions.test).toBeDefined();
            expect(this.events.__transactions.test).toEqual(cb);
            done();
        });
    });

    describe('.transact()', () => {

        it('should be defined', (done) => {
            expect(this.events.transact).toBeDefined();
            done();
        });

        it('should call a registered transaction', (done) => {
            var spy = jasmine.createSpy('transaction');
            this.events.transaction('test', spy);
            this.events.transact('test');
            expect(spy).toHaveBeenCalled();
            done();
        });

        it('should return a promise', (done) => {
            var spy = jasmine.createSpy('transaction');
            this.events.transaction('test', spy);
            var promise = this.events.transact('test');
            expect(promise.then).toBeDefined();
            expect(promise.done).toBeDefined();
            expect(promise.fail).toBeDefined();
            done();
        });
    });

    describe('.stopTransacting()', () => {

        it('should be defined', (done) => {
            expect(this.events.stopTransacting).toBeDefined();
            done();
        });

        it('should remove a registered transaction', (done) => {
            this.events.transaction('test', () => {});
            expect(this.events.__transactions.test).toBeDefined();

            this.events.stopTransacting('test');
            expect(this.events.__transactions.test).not.toBeDefined();
            done();
        });
    });

    describe('.response()', () => {

        it('should be defined', (done) => {
            expect(this.events.response).toBeDefined();
            done();
        });

        it('should register a response', (done) => {
            var cb = () => {};
            this.events.response('test', cb);
            expect(this.events.__responses.test).toBeDefined();
            expect(this.events.__responses.test).toEqual(cb);
            done();
        });
    });

    describe('.request()', () => {

        it('should be defined', (done) => {
            expect(this.events.transact).toBeDefined();
            done();
        });

        it('should call a registered response', (done) => {
            var spy = jasmine.createSpy('transaction');
            this.events.response('test', spy);
            this.events.request('test');
            expect(spy).toHaveBeenCalled();
            done();
        });

        it('should return a value from response', (done) => {
            var cb = () => { return 'test'; };
            this.events.response('test', cb);
            var ret = this.events.request('test');
            expect(ret).toEqual('test');
            done();
        });
    });

    describe('.stopResponding()', () => {

        it('should be defined', (done) => {
            expect(this.events.stopResponding).toBeDefined();
            done();
        });

        it('should remove a registered response', (done) => {
            this.events.response('test', () => {});
            expect(this.events.__responses.test).toBeDefined();

            this.events.stopResponding('test');
            expect(this.events.__responses.test).not.toBeDefined();
            done();
        });
    });

    describe('.command()', () => {

        it('should be defined', (done) => {
            expect(this.events.command).toBeDefined();
            done();
        });

        it('should register a command', (done) => {
            var cb = () => {};
            this.events.command('test', cb);
            expect(this.events.__commands.test).toBeDefined();
            expect(this.events.__commands.test).toEqual(cb);
            done();
        });
    });

    describe('.execute()', () => {

        it('should be defined', (done) => {
            expect(this.events.execute).toBeDefined();
            done();
        });

        it('should call a registered command', (done) => {
            var spy = jasmine.createSpy('command');
            this.events.command('test', spy);
            this.events.execute('test');
            expect(spy).toHaveBeenCalled();
            done();
        });
    });

    describe('.stopExecuting()', () => {

        it('should be defined', (done) => {
            expect(this.events.stopExecuting).toBeDefined();
            done();
        });

        it('should remove a registered response', (done) => {
            this.events.command('test', () => {});
            expect(this.events.__commands.test).toBeDefined();

            this.events.stopExecuting('test');
            expect(this.events.__commands.test).not.toBeDefined();
            done();
        });
    });
});
