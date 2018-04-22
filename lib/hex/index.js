"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hex;
(function (Hex) {
    function encode(str) {
        var HEX = "0123456789ABCDEF", radix = 16, len = str.length, encodeStr = "";
        for (var i = 0; i < len; i++) {
            var num = parseInt(str.charCodeAt(i).toString(), 10);
            encodeStr += "%" + Math.floor(num / radix) + HEX.charAt(num % radix);
        }
        return encodeStr;
    }
    Hex.encode = encode;
    function decode(str) {
        var arr = str.split("%"), str = "";
        for (var i = 1; arr[i]; i++) {
            str += String.fromCharCode(parseInt(arr[i], 16));
        }
        return str;
    }
    Hex.decode = decode;
})(Hex || (Hex = {}));
exports.default = Hex;
