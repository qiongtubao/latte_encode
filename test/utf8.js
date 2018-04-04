var Utf8 = require('../index').utf8;
describe('object', function() {
    it("decode", function(done) {
        console.log(Utf8.decode("latteçä¸ç")) ; //latte的世界
        done();
    });
    it("encode", function(done) {
        console.log(Utf8.encode("latte的世界")) ; //latte的世界
        done();
    });
    it("ucs2decode", function(done) {
        console.log(Utf8.ucs2decode("latte的世界")) ; //latte的世界
        done();
    });
    it("ucs2encode", function(done) {
        console.log(Utf8.ucs2encode([108,97,116,116,101,30340,19990,30028])) ; //latte的世界
        done();
    });
});
