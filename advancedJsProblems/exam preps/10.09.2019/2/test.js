const { expect } = require('chai');
const ChristmasMovies = require('./02. Christmas Movies_Resources')

describe('Tests', () => {
    let christmas;
    it('instantiation without params', () => {
        const init = new ChristmasMovies();
        expect(Array.isArray(init.movieCollection)).to.equals(true);
        expect(init.movieCollection.length).to.equal(0);

        expect(typeof init.watched).to.equal('object')
        expect(Object.keys(init.watched).length).to.equal(0);

        expect(Array.isArray(init.actors)).to.equal(true);
        expect(init.actors.length).to.equal(0);
    })


    beforeEach(() => {
        christmas = new ChristmasMovies();
    });
    it('buy movie', () => {
        expect(() => christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])).to.not.throw()
    })
    it('buys same  movie', () => {
        christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])
        expect(() => christmas.buyMovie('Last Christmas', ['Madison Ingoldsby', 'Emma Thompson', 'Boris Isakovic', 'Madison Ingoldsby'])).to.throw()
    })
    it('repeating actors', () => {

        expect(christmas.buyMovie('test', ['Madison Ingoldsby', 'Emma Thompson', 'Madison Ingoldsby'])).to.equal('You just got test to your collection in which Madison Ingoldsby, Emma Thompson are taking part!')
    })

    it('discardMovie', () => {
        christmas.buyMovie('test', ['Madison Ingoldsby', 'Emma Thompson', 'Madison Ingoldsby']);
        expect(() => christmas.discardMovie('test')).to.throw(`test is not watched!`);
    })
    it('discardMovie', () => {
        expect(() => christmas.discardMovie('test')).to.throw(`test is not at your collection!`);
    })
    it('discardMovie', () => {
        christmas.buyMovie('test', ['Madison Ingoldsby', 'Emma Thompson', 'Madison Ingoldsby']);
        christmas.watchMovie('test')
        expect(christmas.discardMovie('test')).to.equal('You just threw away test!');
        expect(christmas.movieCollection.length).to.eq(0)
    })
    it('watch movie', () => {
        expect(() => christmas.watchMovie('Invalid Test')).to.throw('No such movie in your collection!');
    })
    it('watch movie', () => {
        christmas.buyMovie('test', ['Madison Ingoldsby', 'Emma Thompson', 'Madison Ingoldsby']);
        christmas.watchMovie('test')
        expect(christmas.watched.test).to.eq(1);
    })
    it('watch movie', () => {
        christmas.buyMovie('test', ['Madison Ingoldsby', 'Emma Thompson', 'Madison Ingoldsby']);
        christmas.watchMovie('test')
        christmas.watchMovie('test')
        expect(christmas.watched.test).to.eq(2);
    })

    it('fav movie', () => {
        christmas.buyMovie('test', ['Madison Ingoldsby', 'Emma Thompson', 'Madison Ingoldsby']);
        christmas.buyMovie('test2', ['Madison Ingoldsby', 'Emma Thompson', 'Madison Ingoldsby']);
        christmas.watchMovie('test')
        christmas.watchMovie('test')
        christmas.watchMovie('test2')
        expect(christmas.favouriteMovie()).to.eq(`Your favourite movie is test and you have watched it 2 times!`);
    })
    it('fav movie', () => {
        expect(() => christmas.favouriteMovie()).to.throw('You have not watched a movie yet this year!');
    })
    it('star actor', () => {
        christmas.buyMovie('test', ['Madison Ingoldsby']);
        christmas.buyMovie('test2', ['Madison Ingoldsby', 'Emma Thompson', 'test']);
        expect(christmas.mostStarredActor()).to.eq(`The most starred actor is Madison Ingoldsby and starred in 2 movies!`)
    })

    it('star actor', () => {
        expect(() => christmas.mostStarredActor()).to.throw('You have not watched a movie yet this year!')
    })
})