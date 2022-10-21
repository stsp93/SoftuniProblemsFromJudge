const { expect } = require("chai");
const {testNumbers} = require('./testNumbers')
describe("Tests", function() {
    describe("sumNumber", function() {
        it('with strings', function() {
            expect(testNumbers.sumNumbers('-1',1)).to.be.undefined
            expect(testNumbers.sumNumbers(1,'1')).to.be.undefined
        });
        it ('with positive', () => {
            expect(testNumbers.sumNumbers(1,1)).to.eq('2.00')
        })
        it ('with negaive', () => {
            expect(testNumbers.sumNumbers(-1,-1)).to.eq('-2.00')
        })
        it ('with floats', () => {
            expect(testNumbers.sumNumbers(1.5,1.25)).to.eq('2.75')
        })
     });

     describe("numChecker", function() {
        it('with text', function() {
            expect(() => testNumbers.numberChecker('test')).to.throw('The input is not a number!')
        });
        it ('with string odd', () => {
            expect(testNumbers.numberChecker('1')).to.eq('The number is odd!')
            expect(testNumbers.numberChecker('2')).to.eq('The number is even!')
        })
        it ('with numbers', () => {
            expect(testNumbers.numberChecker(1)).to.eq('The number is odd!')
            expect(testNumbers.numberChecker(2)).to.eq('The number is even!')
        })
     });

     describe("averageSumArray", function() {
        it('with text', function() {
            expect(testNumbers.averageSumArray([1,2,3])).to.eq(2)
        });
     });
});
