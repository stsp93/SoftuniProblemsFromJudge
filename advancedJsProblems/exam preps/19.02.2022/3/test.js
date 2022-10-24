const { expect } = require("chai");
const { flowerShop } = require("./flowerShop");

describe("Tests …", function() {
    describe("calcPriceOfFlowers", function() {
        it("invalid", function() {
            expect(() => flowerShop.calcPriceOfFlowers(1, 1, 1)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('test', 1.1, 1)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('test', 1, 1.1)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('test', '1', 1)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('test', 1, '1')).to.throw('Invalid input!');
        });
        it('valid', () => {
            expect(flowerShop.calcPriceOfFlowers('test', 1 , 2)).to.eq(`You need $2.00 to buy test!`)
        })
     });
     describe("checkFlowersAvailable", function() {
        it("invalid", function() {
            expect(flowerShop.checkFlowersAvailable('test', ['test1', 'test2'])).to.eq( `The test are sold! You need to purchase more!`);
        });
        it('valid', () => {
            expect(flowerShop.checkFlowersAvailable('test2', ['test1', 'test2'])).to.eq(`The test2 are available!`)
        })
     });
     describe("sellFlowers", function() {
        it("invalid", function() {
            expect(() => flowerShop.sellFlowers(['test1', 'test2'], 1.1)).to.throw( 'Invalid input!');
            expect(() => flowerShop.sellFlowers( ['test1', 'test2'],-1)).to.throw( 'Invalid input!');
            expect(() => flowerShop.sellFlowers( ['test1', 'test2'],3)).to.throw( 'Invalid input!');
        });
        it('valid', () => {
            expect(flowerShop.sellFlowers(['test1', 'test2','test3'], 2)).to.eq(`test1 / test2`)
        })
     });
     
});
