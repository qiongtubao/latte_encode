"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./utf8/index");
var index_2 = require("./utf8/index");
var index_3 = require("./base64/index");
exports.default = {
    utf8: index_1.default,
    hex: index_2.default,
    base64: index_3.default
};
