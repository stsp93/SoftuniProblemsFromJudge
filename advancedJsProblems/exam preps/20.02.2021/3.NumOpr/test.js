const { expect } = require("chai");
const { numberOperations } = require("./03. Number Operations_Resources");

describe("Tests …", function () {
    describe("powNum", function () {

        it("with numer", function () {
            expect(numberOperations.powNumber(2)).to.eq(4)
        });
    });

    describe('numberChecker', () => {
        it('with num', () => {
            expect(numberOperations.numberChecker(0)).to.eq('The number is lower than 100!')
        })
        it('with string < 100', () => {
            expect(numberOperations.numberChecker('0')).to.eq('The number is lower than 100!')
        })
        it('with string >= 100', () => {
            expect(numberOperations.numberChecker('100')).to.eq('The number is greater or equal to 100!');
            expect(numberOperations.numberChecker('101')).to.eq('The number is greater or equal to 100!')
        })
        it('with text', () => {
            expect(() => numberOperations.numberChecker('asd')).to.throw('The input is not a number!')
        })
    })
    let arr1;
    let arr2;
    describe('sumArrays', () => {
        beforeEach(() => {
            arr1 = [1, 2, 3];
            arr2 = [-1, -2, -3, -4]
        })
        it('sums 2 === arrs', () => {
            expect(numberOperations.sumArrays(arr1, arr1)[0]).to.eq(2);
            expect(numberOperations.sumArrays(arr1, arr1)[1]).to.eq(4);
            expect(numberOperations.sumArrays(arr1, arr1)[2]).to.eq(6);
        })
        it('sums 2 !== arrs first bigger', () => {
            expect(numberOperations.sumArrays(arr1, arr2)[0]).to.eq(0);
            expect(numberOperations.sumArrays(arr1, arr2)[1]).to.eq(0);
            expect(numberOperations.sumArrays(arr1, arr2)[2]).to.eq(0);
            expect(numberOperations.sumArrays(arr1, arr2)[3]).to.eq(-4);
        })
        // it('sums 2 !== arrs second bigger', () => {
        //     expect(numberOperations.sumArrays(arr2, arr1)[0]).to.eq(0);
        //     expect(numberOperations.sumArrays(arr2, arr1)[1]).to.eq(0);
        //     expect(numberOperations.sumArrays(arr2, arr1)[2]).to.eq(0);
        //     expect(numberOperations.sumArrays(arr2, arr1)[3]).to.eq(-4);
        // })
    })
});
