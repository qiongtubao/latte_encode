var Base64 = require('../../index').base64;
var expect = require('chai').expect;
describe('object', function () {
  it("decode", function () {
    expect(Base64.decode("bGF0dGXnmoTkuJbnlYw=")).to.be.equal('latte的世界')
  });
  it("encode", function () {
    expect(Base64.encode("latte的世界")).to.be.equal('bGF0dGXnmoTkuJbnlYw=');
  });
});
