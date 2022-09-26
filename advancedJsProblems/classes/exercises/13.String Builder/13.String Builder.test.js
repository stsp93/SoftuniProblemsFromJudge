const { expect } = require('chai');
const { before } = require('mocha');
const { StringBuilder } = require('./13.String Builder');

describe('Test Suites', () => {
    describe('instantiation tests', () => {
        it('empty constructor to work', () => {
            const sb = new StringBuilder()
            expect(sb.toString()).to.equal('');
        });

        it('to work with string arg', () => {
            const sb = new StringBuilder('test')
            expect(sb.toString()).to.equal('test');
        });

        it('to not work with number arg ', () => {
            expect(() => new StringBuilder(123)).to.throw('Argument must be a string');
        });
        it('to not work with boolean arg', () => {
            expect(() => new StringBuilder(true)).to.throw('Argument must be a string');
        });
        it('to not work with array arg ', () => {
            expect(() => new StringBuilder(['a', 'b'])).to.throw('Argument must be a string');
        });
    })

    describe('append func tests', () => {
        beforeEach(() => sb = new StringBuilder('test'));

        it('returns array of chars from string passed', () => {
            sb.append('123')
            expect(sb.toString()).to.equal('test123');
        })

        it('returns correct if empty string is passed', () => {
            sb.append('')
            expect(sb.toString()).to.equal('test');
        })

        it('throws error if number is passed', () => {

            expect(() => sb.append(0)).to.throw('Argument must be a string');
        })
        it('throws error if no arg', () => {
            expect(() => sb.append()).to.throw('Argument must be a string');
        })
        it('throws error if array is passed', () => {

            expect(() => sb.append(['00'])).to.throw('Argument must be a string');
        })
    })

    describe('prepend func tests', () => {
        beforeEach(() => sb = new StringBuilder('test'));

        it('returns correct if string passed', () => {
            sb.prepend('123')
            expect(sb.toString()).to.equal('123test');
        });

        it('returns correct if empty string is passed', () => {
            sb.prepend('')
            expect(sb.toString()).to.equal('test');
        })

        it('throws error if number is passed', () => {
            expect(() => sb.prepend(0)).to.throw('Argument must be a string');
        });

        it('throws error if no arg', () => {
            expect(() => sb.prepend()).to.throw('Argument must be a string');
        })
        it('throws error if array is passed', () => {
            expect(() => sb.prepend(['1', '2', '3'])).to.throw('Argument must be a string');
        })
    })

    describe('insertAt func tests', () => {
        beforeEach(() => sb = new StringBuilder('test'));

        it('works with valid arguments', () => {
            sb.insertAt('123', 1);
            expect(sb.toString()).to.be.equal('t123est');
        });
        it('works with 0 as index arg', () => {
            sb.insertAt('123', 0);
            expect(sb.toString()).to.be.equal('123test');
        })
        it('works with empty string', () => {
            sb.insertAt('', 0);
            expect(sb.toString()).to.be.equal('test');
        });

        it('throws error with undefined as first arg', () => {
            expect(() => sb.insertAt(undefined, 0)).to.throw('Argument must be a string');
        })

        it('throws error if first argument is array', () => {
            expect(() => sb.insertAt([1], 1)).to.throw('Argument must be a string')
        })

        it('throws error if first argument is number', () => {
            expect(() => sb.insertAt(1, 1)).to.throw('Argument must be a string')
        })
    })

    describe('remove func tests', () => {
        beforeEach(() => sb = new StringBuilder('test'));

        it('works correct with valid length', () => {
            sb.remove(1, 2);
            expect(sb.toString()).to.be.equal('tt')
        });

        it('works correct with length out of bound', () => {
            sb.remove(1, 4);
            expect(sb.toString()).to.be.equal('t')
        });
        it('check for inclusive', () => {
            sb.remove(sb.toString().length - 1, 4);
            expect(sb.toString()).to.be.equal('tes')
        });

        it('returns empty string with 0 index and length out of bound', () => {
            sb.remove(0, 4);
            expect(sb.toString()).to.be.equal('')
        });

        it('works correct with length of 0', () => {
            sb.remove(1, 0);
            expect(sb.toString()).to.be.equal('test')
        })
    })

    describe('integration test', () => {
        beforeEach(() => sb = new StringBuilder());

        it('test all functions to work properly together', () => {
            sb.append('123\n');
            sb.prepend('123\t');
            sb.append('asd');
            sb.prepend('dsa');
            sb.remove(2, 4);
            sb.insertAt('test', 1);
            sb.remove(6, 1)
            expect(sb.toString()).to.be.equal('dtests123\nasd')
        })

    })

})