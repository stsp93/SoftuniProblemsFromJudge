const { isOddOrEven } = require('./2.Even or Odd');
const { assert } = require('chai');

describe('Test Suite', () => {
    it('returns undefined if argument is number', () => {
        assert.equal(isOddOrEven(1), undefined);
    });
    it('returns undefined if argument is object', () => {
        assert.equal(isOddOrEven({}), undefined);
    });
    it('returns undefined if argument is array', () => {
        assert.equal(isOddOrEven([]), undefined);
    });
    it('returns undefined if argument is boolean', () => {
        assert.equal(isOddOrEven(true), undefined);
    });
    it('returns odd if a is passed', () => {
        assert.equal(isOddOrEven('a'), 'odd');
    });
    it('returns even if aa is passed', () => {
        assert.equal(isOddOrEven('aa'), 'even');
    });

})