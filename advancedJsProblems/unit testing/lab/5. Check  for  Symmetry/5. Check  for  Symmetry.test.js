const { expect } = require('chai');
const {isSymmetric} = require('./5. Check  for  Symmetry');

describe('Test Suite', () => {
    it('works with numbers array', () => {
        expect(isSymmetric([1,2,1])).to.be.true
        expect(isSymmetric([1,2,2,1])).to.be.true
    });

    it('false if incorrect', () => {
        expect(isSymmetric([1,2,3,1])).to.be.false
    }) 
    it('works with string array', () => {
        expect(isSymmetric(['a','b','a'])).to.be.true
        expect(isSymmetric(['a','b','b','a'])).to.be.true
    })
    it('false if string',() => {
        expect(isSymmetric('abba')).to.be.false
    }) 
    it('false with mixed string/number array',() => {
        expect(isSymmetric(['1',2,1])).to.be.false
    }) 
})