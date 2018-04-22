var Utf8 = require('../../index').utf8;
var expect = require('chai').expect;
describe('object', function () {
    it("decode", function () {
        expect(Utf8.decode("ç¼ç ")).to.be.equal('编码')
    });
    it("encode", function () {
        expect(Utf8.encode("编码")).to.be.equal('ç¼ç ')
    });
    it("ucs2decode", function () {
        expect(Utf8.ucs2decode('latte的世界')).to.deep.equal([108, 97, 116, 116, 101, 30340, 19990, 30028]);
    });
    it("ucs2encode", function () {
        expect(Utf8.ucs2encode([108, 97, 116, 116, 101, 30340, 19990, 30028])).to.be.equal('latte的世界');
    });
});
