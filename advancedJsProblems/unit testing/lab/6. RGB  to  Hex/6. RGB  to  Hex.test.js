const { rgbToHexColor } = require('./6. RGB  to  Hex');
const { expect } = require('chai');

describe('Test Suite', () => {
    it('0 0 0 to be #000000 ', () => {
        expect(rgbToHexColor(0, 0, 0)).to.be.equal('#000000')
    });
    it('255 255 255 to be #FFFFFF ', () => {
        expect(rgbToHexColor(255, 255, 255)).to.be.equal('#FFFFFF')
    });
    it('undefined if out of lower bound', () => {
        expect(rgbToHexColor(-1, -1, -1)).to.be.undefined
    });
    it('undefined if out of upper bound', () => {
        expect(rgbToHexColor(256, 256, 256)).to.be.undefined
    });
    it('green 73, 207, 25 to be #49CF19 ', () => {
        expect(rgbToHexColor(73, 207, 25)).to.be.equal('#49CF19')
    });
    it('15, 15, 15 to be #0F0F0F ', () => {
        expect(rgbToHexColor(15, 15, 15)).to.be.equal('#0F0F0F')
    });
    it('undefined with string parameters ', () => {
        expect(rgbToHexColor('0',0,0)).to.be.undefined
        expect(rgbToHexColor(0,'0',0)).to.be.undefined
        expect(rgbToHexColor(0,0,'0')).to.be.undefined
    });
})