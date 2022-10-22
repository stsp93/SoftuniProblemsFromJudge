const { expect } = require("chai");
const { cinema } = require("./cinema");


describe("Tests …", function() {
    describe("showMovies", function() {
        it("length 0", function() {
            expect(cinema.showMovies([])).to.eq('There are currently no movies to show.')
        });
        it("with movies", function() {
            expect(cinema.showMovies(['King Kong', 'The Tomorrow War'])).to.eq('King Kong, The Tomorrow War');
        });
     });

     describe("ticketPriceovies", function() {
        const schedule = {
            "Premiere": 12.00,
            "Normal": 7.50,
            "Discount": 5.50
        }
        it("valid", function() {
            expect(cinema.ticketPrice('Premiere')).to.eq(12);
            expect(cinema.ticketPrice('Normal')).to.eq(7.5);
            expect(cinema.ticketPrice('Discount')).to.eq(5.5);
        });
        it("invalid", function() {
            expect(() => cinema.ticketPrice('invalid')).to.throw('Invalid projection type.');
            expect(() => cinema.ticketPrice('normal')).to.throw('Invalid projection type.');
        });

        describe("swapSeatsInHall", function() {
            it("valid", function() {
                expect(cinema.swapSeatsInHall(1,20)).to.eq("Successful change of seats in the hall.")
            });
            it("with 0", function() {
                expect(cinema.swapSeatsInHall(0,2)).to.eq("Unsuccessful change of seats in the hall.");
                expect(cinema.swapSeatsInHall(2,0)).to.eq("Unsuccessful change of seats in the hall.")
            });
            it("> 20", function() {
                expect(cinema.swapSeatsInHall(21,1)).to.eq("Unsuccessful change of seats in the hall.")
                expect(cinema.swapSeatsInHall(1,21)).to.eq("Unsuccessful change of seats in the hall.")
            });
            it("strings", function() {
                expect(cinema.swapSeatsInHall('1',2)).to.eq("Unsuccessful change of seats in the hall.")
                expect(cinema.swapSeatsInHall(1,'2')).to.eq("Unsuccessful change of seats in the hall.");
                expect(cinema.swapSeatsInHall('1','2')).to.eq("Unsuccessful change of seats in the hall.")
            });
            it("-1", function() {
                expect(cinema.swapSeatsInHall(-1,2)).to.eq("Unsuccessful change of seats in the hall.")
            });
            it("with text", function() {
                expect(cinema.swapSeatsInHall('test',2)).to.eq("Unsuccessful change of seats in the hall.")
                expect(cinema.swapSeatsInHall('test','test')).to.eq("Unsuccessful change of seats in the hall.")
                expect(cinema.swapSeatsInHall(2,'test')).to.eq("Unsuccessful change of seats in the hall.")
            });
            it("with missing num", function() {
                expect(cinema.swapSeatsInHall(1)).to.eq("Unsuccessful change of seats in the hall.");
                expect(cinema.swapSeatsInHall()).to.eq("Unsuccessful change of seats in the hall.")
            });
         });
     });
});
