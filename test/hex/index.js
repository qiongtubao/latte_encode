var Hex = require('../../index').hex;
var expect = require('chai').expect;
describe('object', function () {
  it("decode", function () {
    expect(Hex.decode("latteçä¸ç")).to.be.equal('latte的世界')
  });
  it("encode", function () {
    expect(Hex.encode("latte的世界")).to.be.equal('latteçä¸ç');
  });
});
