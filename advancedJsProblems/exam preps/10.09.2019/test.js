const { expect } = require("chai");
const dealership = require("./dealership");

describe("Tests", function () {
    describe("newCarCost", function () {
        it("old cars", function () {
            expect(dealership.newCarCost('Audi A4 B8', 30000)).to.eq(15000)
            expect(dealership.newCarCost('Audi A6 4K', 30000)).to.eq(10000)
            expect(dealership.newCarCost('Audi A8 D5', 30000)).to.eq(5000)
            expect(dealership.newCarCost('Audi TT 8J', 30000)).to.eq(16000)
        });
        it("new cars", function () {
            expect(dealership.newCarCost('Audi A4', 30000)).to.eq(30000)
        });
    });

    describe('carEquipment', () => {
        it('works wit valid arrays', () => {
            let extras = ['heated seats', 'sliding roof', 'sport rims', 'navigation'];
            let indexes = [0, 2, 3];

            expect(dealership.carEquipment(extras, indexes)[0]).to.eq('heated seats');
            expect(dealership.carEquipment(extras, indexes)[1]).to.eq('sport rims');
            expect(dealership.carEquipment(extras, indexes)[2]).to.eq('navigation');
        })

    })

    describe('euroCategory', () => {

        it('low categery', () => {
            expect(dealership.euroCategory(3)).to.eq('Your euro category is low, so there is no discount from the final price!')
        })
        it('high cat', () => {
            expect(dealership.euroCategory(4)).to.eq('We have added 5% discount to the final price: 14250.')
        })
    })

});
