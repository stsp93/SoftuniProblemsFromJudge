const { expect } = require("chai");

const {mathEnforcer} = require('./4.Math Enforcer');

describe('Test Suite', () => {
    it('undefined is addFive parameter is string', () => {
        expect(mathEnforcer.addFive('string')).to.be.undefined;
    })
    it('undefined is addFive parameter is string number', () => {
        expect(mathEnforcer.addFive('1')).to.be.undefined;
    })
    it('undefined is addFive parameter is array', () => {
        expect(mathEnforcer.addFive([1])).to.be.undefined;
    })
    it('return 5 if addFive parameter is 0', () => {
        expect(mathEnforcer.addFive(0)).to.be.equal(5);
    })
    it('return correct if addFive parameter is float', () => {
        expect(mathEnforcer.addFive(0.6)).to.be.equal(5.6);
    })
    it('return correct if addFive parameter is negative float', () => {
        expect(mathEnforcer.addFive(-5.5)).to.be.equal(-0.5);
    })
    it('return 0 if addFive parameter is -5', () => {
        expect(mathEnforcer.addFive(-5)).to.be.equal(0);
    })
    it('return -1 if addFive parameter is -6', () => {
        expect(mathEnforcer.addFive(-6)).to.be.equal(-1);
    })
    it('undefined is subtractTen parameter is string', () => {
        expect(mathEnforcer.subtractTen('string')).to.be.undefined;
    })
    it('undefined is subtractTen parameter is string number', () => {
        expect(mathEnforcer.subtractTen('1')).to.be.undefined;
    })
    it('undefined is subtractTen parameter is array', () => {
        expect(mathEnforcer.subtractTen([])).to.be.undefined;
    })
    it('return 0 is subtractTen parameter is 10', () => {
        expect(mathEnforcer.subtractTen(10)).to.be.equal(0);
    })
    it('return correct if subtractTen parameter is float', () => {
        expect(mathEnforcer.subtractTen(10.5)).to.be.equal(0.5);
    })
    it('return correct if subtractTen parameter is negative float', () => {
        expect(mathEnforcer.subtractTen(-10.5)).to.be.equal(-20.5);
    })
    it('return -10 is subtractTen parameter is 0', () => {
        expect(mathEnforcer.subtractTen(0)).to.be.equal(-10);
    })
    it('undefined is sum if first parameter is not a number', () => {
        expect(mathEnforcer.sum('1',2)).to.be.undefined;
    });
    it('undefined is sum if second parameter is not a number', () => {
        expect(mathEnforcer.sum(1,'2')).to.be.undefined;
    });
    it('undefined is sum if both parameters are not a number', () => {
        expect(mathEnforcer.sum('1','2')).to.be.undefined;
    });
    it('return the sum if sum parameters are numbers', () => {
        expect(mathEnforcer.sum(1,2)).to.be.equal(3);
    })
    it('return the sum if sum parameters are floats', () => {
        expect(mathEnforcer.sum(1.5,0.6)).to.be.equal(2.1);
    })
    it('return the sum if sum parameters are negative', () => {
        expect(mathEnforcer.sum(-2,-1)).to.be.equal(-3);
    })
    it('return the sum if sum parameters are negative floats', () => {
        expect(mathEnforcer.sum(-1.6,-0.6)).to.be.equal(-2.2);
    })
})