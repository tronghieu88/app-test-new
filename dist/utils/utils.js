"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCode = void 0;
function randomCode() {
    return +(Math.random() * (999999 - 100000) + 100000).toFixed(0);
}
exports.randomCode = randomCode;
//# sourceMappingURL=utils.js.map