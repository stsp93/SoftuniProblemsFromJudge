const { expect } = require("chai");
const { bookSelection } = require("./bookSelection");


describe("Tests …", function() {
    describe("isGenreSuitable", function() {
        it("under age", function() {
            expect(bookSelection.isGenreSuitable('Thriller', 10)).to.eq(`Books with Thriller genre are not suitable for kids at 10 age`);
            expect(bookSelection.isGenreSuitable('Horror', 10)).to.eq(`Books with Horror genre are not suitable for kids at 10 age`);
        });
        it("valid age", function() {
            expect(bookSelection.isGenreSuitable('Thriller', 13)).to.eq(`Those books are suitable`);
            expect(bookSelection.isGenreSuitable('Horror', 13)).to.eq(`Those books are suitable`);
        });
     });

     describe("isItAffordable", function() {
        it("invalid", function() {
            expect(() => bookSelection.isItAffordable('10', 10)).to.throw("Invalid input");
            expect(() => bookSelection.isItAffordable(10, '10')).to.throw("Invalid input");
        });
        it("valid", function() {
            expect(bookSelection.isItAffordable(10, 9)).to.eq("You don't have enough money");
            expect(bookSelection.isItAffordable(10, 10)).to.eq(`Book bought. You have 0$ left`);
        });
     });

     describe("suitableTitles", function() {
        it("invalid", function() {
            expect(() => bookSelection.suitableTitles(['10'], 10)).to.throw("Invalid input");
            expect(() => bookSelection.suitableTitles(10, '10')).to.throw("Invalid input");
            expect(() => bookSelection.suitableTitles('10', '10')).to.throw("Invalid input");
        });
        it("valid", function() {
            expect(bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"},{title: "test1", genre: "test"} ], 'test')[0]).to.eq("test1");
            expect(bookSelection.suitableTitles([{title: "The Da Vinci Code", genre: "Thriller"},{title: "test1", genre: "test"} ], 'Thriller')[0]).to.eq("The Da Vinci Code");
        });
     });

     
});
