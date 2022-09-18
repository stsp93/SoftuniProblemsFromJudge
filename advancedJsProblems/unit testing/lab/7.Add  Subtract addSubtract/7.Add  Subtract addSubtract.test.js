const { expect } = require('chai');
const {createCalculator} = require('./7.Add  Subtract addSubtract');

describe('Tests', () => {
    let calculator;
    beforeEach(function() {
        calculator = createCalculator()
    })

    it('returns a module', () => {
        expect(typeof calculator).to.be.equal('object');
    });
    it('returns a module', () => {
        expect(typeof calculator).to.be.equal('object');
    });
    it('returns a module', () => {
        expect(typeof calculator).to.be.equal('object');
    });
    it('returns a module', () => {
        expect(typeof calculator).to.be.equal('object');
    });
    it('returns a module', () => {
        expect(typeof calculator).to.be.equal('object');
    });
    it('has functions add, subtract and get properties', () => {
        expect(typeof calculator.add).to.be.equal('function');
        expect(typeof calculator.subtract).to.be.equal('function');
        expect(typeof calculator.get).to.be.equal('function');
    });
    it('cannot change internal value', () => {
        expect(Object.values(calculator).some(v => typeof v !== 'function')).to.be.false;
    });

    it('add, subtract methods take number as argument', () => {
        calculator.add(1)
        expect(calculator.get()).to.be.equal(1);
        calculator.subtract(1);
        expect(calculator.get()).to.be.equal(0);
    });
    it('add, subtract methods parse argument as number ', () => {
        calculator.add('1')
        expect(calculator.get()).to.be.equal(1);
        calculator.subtract('1');
        expect(calculator.get()).to.be.equal(0);
    });
    it('add to accept numbers', () => {
        calculator.add('asdasd')
        expect(calculator.get()).to.be.NaN;
    });
    it('subtract to accept numbers', () => {
        calculator.add('asdasd')
        expect(calculator.get()).to.be.NaN;
    });
})