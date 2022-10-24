const { expect } = require("chai");
const { carService } = require("./03. Car Service_Resources");

describe('tests', () => {
    describe('isItExpensive', () => {
        it('cheaper', () => {
            expect(carService.isItExpensive('test')).to.eq(`The overall price will be a bit cheaper`)
        })
        it('expensive', () => {
            expect(carService.isItExpensive('Engine')).to.eq(`The issue with the car is more severe and it will cost more money`)
            expect(carService.isItExpensive('Transmission')).to.eq(`The issue with the car is more severe and it will cost more money`)
        })

    })

    describe('discount', () => {
        it('invalid', () => {
            expect(() => carService.discount('10', 10)).to.throw("Invalid input");
            expect(() => carService.discount(10, '10')).to.throw("Invalid input");
        })
        it('valid', () => {
            expect(carService.discount(2,10)).to.eq("You cannot apply a discount")
            expect(carService.discount(3,10)).to.eq(`Discount applied! You saved 1.5$`)
            expect(carService.discount(7,10)).to.eq(`Discount applied! You saved 1.5$`)
            expect(carService.discount(8,10)).to.eq(`Discount applied! You saved 3$`)
        })

    })
describe('partsToBuy', () => {
        it('invalid', () => {
            expect(() => carService.partsToBuy(['10'], 10)).to.throw("Invalid input");
            expect(() => carService.partsToBuy(10, ['10'])).to.throw("Invalid input");
        })
        it('valid', () => {
            expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 } ],["blowoff valve", "injectors"])).to.eq(145)
            expect(carService.partsToBuy([],["blowoff valve", "injectors"])).to.eq(0)
        })

    })
    
    
})