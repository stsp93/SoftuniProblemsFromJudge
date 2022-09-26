const { expect } = require('chai')
const {PaymentPackage} = require('./12.Payment Package')


describe('Test Suite', () => {
    describe('name tests', () => {
        it('empty name to throw Error', () => {
            expect(() => new PaymentPackage('',100)).to.throw('Name must be a non-empty string');            
        })
        it('number passed as name to throw Error', () => {
            expect(() => new PaymentPackage(1,100)).to.throw('Name must be a non-empty string');            
        })

        it('setting name to number to throw Error',() => {
            const payment = new PaymentPackage('test', 100);
            expect(() => payment.name = 123).to.throw('Name must be a non-empty string');
        })

        it('setting name to empty string to throw Error',() => {
            const payment = new PaymentPackage('test', 100);
            expect(() => payment.name = '').to.throw('Name must be a non-empty string');
        })

        it('returns correct from name getter',() => {
            const payment = new PaymentPackage('test', 100);
            expect(payment.name).to.equal('test');
        })
    })

    describe('value tests', () => {
        it('string value to throw Error', () => {
            expect(() => new PaymentPackage('test','100')).to.throw('Value must be a non-negative number');            
        })
        it('negative number passed as value to throw Error', () => {
            expect(() => new PaymentPackage('test',-1)).to.throw('Value must be a non-negative number');            
        })
        it('undefined passed as value to throw Error', () => {
            expect(() => new PaymentPackage('test',undefined)).to.throw('Value must be a non-negative number');            
        });

        it('setting value to negative to throw Error',() => {
            const payment = new PaymentPackage('test', 100);
            expect(() => payment.value = -1).to.throw('Value must be a non-negative number');
        });

        it('setting value to string to throw Error',() => {
            const payment = new PaymentPackage('test', 100);
            expect(() => payment.value = 'test').to.throw('Value must be a non-negative number');
        });

        it('returns correct from value getter',() => {
            const payment = new PaymentPackage('test', 100);
            expect(payment.value).to.equal(100);
        });
        it('returns correct if float value is passed ',() => {
            const payment = new PaymentPackage('test', 1.1);
            expect(payment.value).to.equal(1.1);
        });
        it('returns correct if 0 is passed as value',() => {
            const payment = new PaymentPackage('test', 0);
            expect(payment.value).to.equal(0);
        });
    })

    describe('VAT tests', () => {
        beforeEach(() => {
            return payment = new PaymentPackage('test', 100)
        })
        
        it('setting negative VAT to throw Error', () => {
            expect(() => payment.VAT = -1).to.throw('VAT must be a non-negative number')
        });

        it('setting string to VAT to throw Error', () => {
            expect(() => payment.VAT = 'test').to.throw('VAT must be a non-negative number')
        });

        it('setting string parsed number to VAT to throw Error', () => {
            expect(() => payment.VAT = '10').to.throw('VAT must be a non-negative number')
        });

        it('returns default VAT when getter is called', () => {
            expect(payment.VAT).to.equal(20);
        });

        it('returns correct VAT when getter is called', () => {
            payment.VAT = 10;
            expect(payment.VAT).to.equal(10);
        });
    })

    describe('active accessor tests', () => {
        it('returns dafault value when getter is called', () => {
            expect(payment.active).to.equal(true)
        })

        it('throw error when value passed is different from boolean', () => {
            expect(() => payment.active = 1).to.throw('Active status must be a boolean');
            expect(() => payment.active = 'test').to.throw('Active status must be a boolean');
            expect(() => payment.active = null).to.throw('Active status must be a boolean');
        });
    })

    describe('toString tests', () => {
        beforeEach(() => {
            return payment = new PaymentPackage('test', 100)
        });

        it('returns correct when toString is called', () => {
            expect(`${payment}`).to.be.equal(`Package: test
- Value (excl. VAT): 100
- Value (VAT 20%): 120`);
        });
        it('returns correct when toString is called and payment is inactive', () => {
            payment.active = false;
            expect(`${payment}`).to.be.equal(`Package: test (inactive)
- Value (excl. VAT): 100
- Value (VAT 20%): 120`);
        });

    })
})