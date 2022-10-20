const { expect } = require("chai");
let { Repository } = require("./solution.js");

describe("Tests …", function () {
    let properties;
    let repo;
    let entity1;
    let entity2;
    beforeEach(function () {
        properties = {
            name: "string",
            age: "number",
            birthday: "object"
        };
        repo = new Repository(properties);
        entity1 = {
            name: "Pesho",
            age: 22,
            birthday: new Date(1998, 0, 7)
        };
        entity2 = {
            name: 'Gosho',
            age: 22,
            birthday: new Date(1998, 0, 7)
        };
    })

    it('count works correctly with 0 ', () => {
        expect(repo.count).to.eq(0)
    })


    describe('add validation tests', () => {
        it('returns id with valid entity', () => {
            expect(repo.add(entity1)).to.eq(0)
        })
        it('with missing property', () => {
            const entity = {
                name:'Pesho',
                age:20
            }
            expect(() => repo.add(entity)).to.throw(`Property birthday is missing from the entity!`)
        })
        it('with incorrect prop type', () => {
            const entity = {
                name:'Pesho',
                age:20,
                birthday: '20.01.2002'
            }
            expect(() => repo.add(entity)).to.throw(`Property birthday is not of correct type!`)
        })
    })

    describe('getId tests', () => {
        it('returns correct entity', () => {
            repo.add(entity1);
            repo.add(entity2);
            expect(repo.getId(1)).to.eq(entity2);
            expect(repo.getId(0)).to.eq(entity1);
        })
        it('with incorrect id', () => {
            repo.add(entity1);
            expect(() => repo.getId(1)).to.throw(`Entity with id: 1 does not exist!`);

        })
    })

    describe('update tests', () => {
        it('with correct args', () => {
            repo.add(entity1);
            repo.add(entity1);
            repo.update(1,entity2);
            expect(repo.getId(1)).to.eq(entity2);
        })
        it('with invalid id', () => {
            
            expect(() => repo.update(0,entity2)).to.throw(`Entity with id: 0 does not exist!`);
        })

        it('with invalid entity', () => {
            repo.add(entity1);
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: '10.01.2002'
            };
            
            
            expect(() => repo.update(0,entity)).to.throw(`Property birthday is not of correct type!`);
        })
        it('with invalid entity', () => {
            repo.add(entity1);
            let entity = {
                name: "Pesho",
                age: 22,
            };
            
            
            expect(() => repo.update(0,entity)).to.throw(`Property birthday is missing from the entity!`);
        })
    })

    describe('del function tests', () => {
        it('with correct id', () => {
            repo.add(entity1);
            repo.add(entity2);
            repo.del(0)

            expect(() => repo.getId(0)).to.throw(`Entity with id: 0 does not exist!`);
        })
        it('properly del', () => {
            repo.add(entity1);
            repo.add(entity1);
            repo.del(0)

            expect(repo.data.has(0)).to.eq(false);
        })

        it('with incorrect id', () => {
            repo.add(entity1);
            repo.add(entity2);
            
            expect(() => repo.del(-2)).to.throw(`Entity with id: -2 does not exist!`);
        })
    })
});


