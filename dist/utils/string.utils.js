"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeyword = exports.createSlug = void 0;
const slugify_1 = require("slugify");
function createSlug(text) {
    if (!text)
        return '';
    return (0, slugify_1.default)(text, {
        replacement: '-',
        lower: true,
        strict: true,
        trim: true,
    });
}
exports.createSlug = createSlug;
function createKeyword(text) {
    if (!text)
        return '';
    return text.replace(/-/g, ' ');
}
exports.createKeyword = createKeyword;
//# sourceMappingURL=string.utils.js.map