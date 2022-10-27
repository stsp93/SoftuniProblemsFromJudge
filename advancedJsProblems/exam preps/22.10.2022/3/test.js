const { expect } = require("chai")
const { chooseYourCar } = require("./chooseYourCar")



describe('Tests', () => {
    describe('choosingType', () => {
        it('invalid year', () => {
            expect(() => chooseYourCar.choosingType('test', 'test', 1899)).to.throw(`Invalid Year!`);
            expect(() => chooseYourCar.choosingType('test', 'test', 2023)).to.throw(`Invalid Year!`);
            expect(() => chooseYourCar.choosingType('test', 'test', '1899')).to.throw(`Invalid Year!`);
            expect(() => chooseYourCar.choosingType('test', 'test', '1899')).to.throw(`Invalid Year!`);
        });

        it('valid year', () => {
            expect(chooseYourCar.choosingType('Sedan', 'test2', 2010)).to.eq(`This test2 Sedan meets the requirements, that you have.`);
            expect(chooseYourCar.choosingType('Sedan', 'test2', 2009)).to.eq(`This Sedan is too old for you, especially with that test2 color.`);

        })
        it('type !== Sedan', () => {
            expect(() => chooseYourCar.choosingType('test1', 'test2', 2010)).to.throw(`This type of car is not what you are looking for.`);

        })
    })

    describe('brandName', () => {
        it('invalid info', () => {
            expect(() => chooseYourCar.brandName('test', 1)).to.throw("Invalid Information!");
            expect(() => chooseYourCar.brandName(['test'], 1.1)).to.throw("Invalid Information!");
            expect(() => chooseYourCar.brandName(['test'], 'test')).to.throw("Invalid Information!");
            expect(() => chooseYourCar.brandName(['test1', 'test2'], -1)).to.throw("Invalid Information!");
            expect(() => chooseYourCar.brandName(['test1', 'test2'], 2)).to.throw("Invalid Information!");
        });

        it('valid arguments', () => {
            expect(chooseYourCar.brandName(['test1', 'test2', 'test3'], 2)).to.eq('test1, test2');
            expect(chooseYourCar.brandName(['test1', 'test2', 'test3'], 1)).to.eq('test1, test3');

        })
    })

    describe('carFuelConsumption', () => {
        it('invalid info', () => {
            expect(() => chooseYourCar.carFuelConsumption('1', 1)).to.throw("Invalid Information!");
            expect(() => chooseYourCar.carFuelConsumption(1, '1')).to.throw("Invalid Information!");
            expect(() => chooseYourCar.carFuelConsumption(0, 1)).to.throw("Invalid Information!");
            expect(() => chooseYourCar.carFuelConsumption(1, 0)).to.throw("Invalid Information!");
            expect(() => chooseYourCar.carFuelConsumption(-1, 1)).to.throw("Invalid Information!");
            expect(() => chooseYourCar.carFuelConsumption(1, -1)).to.throw("Invalid Information!");
        });

        it('valid arguments', () => {
            expect(chooseYourCar.carFuelConsumption(100, 7)).to.eq(`The car is efficient enough, it burns 7.00 liters/100 km.`);
            expect(chooseYourCar.carFuelConsumption(100, 8)).to.eq(`The car burns too much fuel - 8.00 liters!`);
            expect(chooseYourCar.carFuelConsumption(100, 6.9)).to.eq(`The car is efficient enough, it burns 6.90 liters/100 km.`);
            expect(chooseYourCar.carFuelConsumption(100, 7.1)).to.eq(`The car burns too much fuel - 7.10 liters!`);

        })
    })
})