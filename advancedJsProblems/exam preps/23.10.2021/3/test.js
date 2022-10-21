const { expect } = require("chai");
const { library } = require("./library");



describe("Tests …", function() {
    describe("calcPriceOfBook", function() {
        it("invalid args", function() {
            expect(() => library.calcPriceOfBook('test', '2000')).to.throw("Invalid input")
            expect(() => library.calcPriceOfBook(123, 2000)).to.throw("Invalid input")
            expect(() => library.calcPriceOfBook(123, '2000')).to.throw("Invalid input")
        });
        it("valid args", function() {
            expect(library.calcPriceOfBook('test', 1980)).to.eq(`Price of test is 10.00`)
            expect(library.calcPriceOfBook('test', 2000)).to.eq(`Price of test is 20.00`)
        });
     });
     describe("findBook", function() {
        it("invalid args", function() {
            expect(() => library.findBook([], 'test')).to.throw("No books currently available")
        });
        it("valid args", function() {
            expect(library.findBook(['test1', 'test2'], 'test1')).to.eq("We found the book you want.")
            expect(library.findBook(['test1', 'test2'], 'test')).to.eq("The book you are looking for is not here!")
        });
     });
     describe("arrangeTheBooks", function() {
        it("invalid args", function() {
            expect(() => library.arrangeTheBooks(-1)).to.throw("Invalid input")
            expect(() => library.arrangeTheBooks('test')).to.throw("Invalid input")
        });
        it("valid args", function() {
            expect(library.arrangeTheBooks(40)).to.eq("Great job, the books are arranged.");
            expect(library.arrangeTheBooks(0)).to.eq("Great job, the books are arranged.");
            expect(library.arrangeTheBooks(41)).to.eq("Insufficient space, more shelves need to be purchased.")
        });
     });
     // TODO: …
});
