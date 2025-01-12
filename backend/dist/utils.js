"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
function random(len) {
    let options = "abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options.charAt(Math.floor(Math.random() * options.length));
    }
    return ans;
}
exports.random = random;
