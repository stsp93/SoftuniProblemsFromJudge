const {sum} = require('./4. Sum of Numbers')
const { expect } = require('chai');

describe('Sum tests', () => {
    it('works with array of numbers', () => {
        expect(sum([1,2,3])).to.equal(6);
    });

    it('dont work with array of strings', () => {
        expect(sum(['1',2,3])).to.equal(6);
    });

    it('equal 0 if empty arr', () => {
        expect(sum([])).to.equal(0);
    })
})
