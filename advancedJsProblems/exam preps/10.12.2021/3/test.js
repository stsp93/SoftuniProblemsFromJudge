const { expect } = require("chai");
const { companyAdministration } = require("./companyAdministration");


describe("Tests …", function() {
    describe("hiringEmployee", function() {
        it("programmer", function() {
            expect(companyAdministration.hiringEmployee('test', "Programmer", 3)).to.eq(`test was successfully hired for the position Programmer.`);
            expect(companyAdministration.hiringEmployee('test', "Programmer", 2)).to.eq(`test is not approved for this position.`);
        });
        it("!programmer", function() {
            expect(() => companyAdministration.hiringEmployee('test', "test", 3)).to.throw(`We are not looking for workers for this position.`);

        });
     });
     describe("calculateSalary", function() {
        it("programmer", function() {
            expect(companyAdministration.calculateSalary(160)).to.eq(2400);
            expect(companyAdministration.calculateSalary(161)).to.eq(3415);
        });
        it("invalid", function() {
            expect(() => companyAdministration.calculateSalary('test')).to.throw("Invalid hours");
            expect(() => companyAdministration.calculateSalary(-1)).to.throw("Invalid hours");

        });
     });
     describe("firedEmployee", function() {
        it("valid", function() {
            expect(companyAdministration.firedEmployee(['test1', 'test2', 'test3'], 1)).to.eq('test1, test3');
            expect(companyAdministration.firedEmployee(['test1', 'test2', 'test3'], 0)).to.eq('test2, test3');
        });
        it("invalid", function() {
            expect(() => companyAdministration.firedEmployee('test',0)).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee(1,0)).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee(['test1', 'test2', 'test3'], 1.1)).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee(['test1', 'test2', 'test3'], 3)).to.throw("Invalid input");
            expect(() => companyAdministration.firedEmployee(['test1', 'test2', 'test3'], -1)).to.throw("Invalid input");

        });
     });
     
});
