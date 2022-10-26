const { expect } = require("chai");
const { rentCar } = require("./rentCar");


describe("Tests …", function () {
    describe("searchCar", function () {
        it("invalid", function () {
            expect(() => rentCar.searchCar('test', 'test')).to.throw('Invalid input!');
            expect(() => rentCar.searchCar(['test'], 1)).to.throw('Invalid input!');
        });
        it("valid", function () {
            expect(() => rentCar.searchCar(['test1', 'test2'], 'test')).to.throw('There are no such models in the catalog!');
            expect(rentCar.searchCar(['test1', 'test2', 'test2'], 'test2')).to.eq(`There is 2 car of model test2 in the catalog!`);
            expect(rentCar.searchCar(['test1', 'test2', 'test2'], 'test1')).to.eq(`There is 1 car of model test1 in the catalog!`);
        });
    });
    describe("calculatePriceOfCar", function () {
        it("invalid", function () {
            expect(() => rentCar.calculatePriceOfCar(1, 'test')).to.throw('Invalid input!');
            expect(() => rentCar.calculatePriceOfCar('test', 1.1)).to.throw('Invalid input!');
            expect(() => rentCar.calculatePriceOfCar('test', 'test')).to.throw('Invalid input!');
            expect(() => rentCar.calculatePriceOfCar('test', '10')).to.throw('Invalid input!');
        });
        it("valid", function () {
            expect(() => rentCar.calculatePriceOfCar('test1', 10)).to.throw('No such model in the catalog!');
            expect(rentCar.calculatePriceOfCar('Audi', 10)).to.eq(`You choose Audi and it will cost $360!`);
            expect(rentCar.calculatePriceOfCar('Volkswagen', 10)).to.eq(`You choose Volkswagen and it will cost $200!`);
            expect(rentCar.calculatePriceOfCar('Toyota', 10)).to.eq(`You choose Toyota and it will cost $400!`);
            expect(rentCar.calculatePriceOfCar('BMW', 10)).to.eq(`You choose BMW and it will cost $450!`);
            expect(rentCar.calculatePriceOfCar('Mercedes', 10)).to.eq(`You choose Mercedes and it will cost $500!`);
        });
    });
    describe("checkBudget", function () {
        it("invalid", function () {
            expect(() => rentCar.checkBudget('test', 1, 1)).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1, 'test', 1)).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1, 1, 'test')).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget('1', 1, 1)).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1, '1', 1)).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1, 1, '1')).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1.1, 1, 1)).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1, 1.1, 1)).to.throw('Invalid input!');
            expect(() => rentCar.checkBudget(1, 1, 1.1)).to.throw('Invalid input!');
            
        });
        it("valid", function () {
            expect(rentCar.checkBudget(10, 10, 100)).to.eq(`You rent a car!`);
            expect(rentCar.checkBudget(10, 10, 99)).to.eq('You need a bigger budget!');
            expect(rentCar.checkBudget(10, 10, 101)).to.eq(`You rent a car!`);
        });
    });

});
