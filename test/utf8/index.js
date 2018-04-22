var Utf8 = require('../index').utf8;
describe('object', function() {
    it("decode", function(done) {
        console.log(Utf8.decode("ç¼ç ")) ; //latte的世界
        done();
    });
    it("encode", function(done) {
        console.log(Utf8.encode("编码")) ; //latte的世界
        done();
    });
    it("ucs2decode", function(done) {
        console.log(Utf8.ucs2decode("编码")) ; //latte的世界
        done();
    });
    it("ucs2encode", function(done) {
        console.log(Utf8.ucs2encode([ 32534, 30721 ])) ; //latte的世界
        done();
    });
});
