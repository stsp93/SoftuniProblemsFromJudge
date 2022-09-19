const { expect } = require('chai');
const {lookupChar} = require('./3.Char Lookup');

describe('Test Suite', () => {
    it('return undefined if first param is not a string', () => {
        expect(lookupChar(10,1)).to.be.undefined;
        expect(lookupChar(true,1)).to.be.undefined;
        expect(lookupChar(['string'],1)).to.be.undefined;
        expect(lookupChar({0:'string'},1)).to.be.undefined;
    });
    it('return undefined if second param is not integer', () => {
        expect(lookupChar('string',1.1)).to.be.undefined;
        expect(lookupChar('string',true)).to.be.undefined;
        expect(lookupChar('string',[1])).to.be.undefined;
        expect(lookupChar('string',{1:1})).to.be.undefined;
    });
    it('return Incorrect index if index out of upper bound', () => {
        expect(lookupChar('string', 6)).to.be.equal('Incorrect index');
        expect(lookupChar('string', 7)).to.be.equal('Incorrect index');
    });
    it('return Incorrect index if index out of lower bound', () => {
        expect(lookupChar('string', -1)).to.be.equal('Incorrect index');
    });

    it('return t if (string,1) is passed', () => {
        expect(lookupChar('string', 1)).to.be.equal('t');
    });
})
