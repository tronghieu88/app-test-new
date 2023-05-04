"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
    categoryId: { type: String, trim: true, required: true },
    categoryName: { type: String, trim: true },
    description: { type: String, trim: true },
    createdAt: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
    updatedAt: { type: Date, default: new Date() },
    slug: { type: String, trim: true },
    keyword: { type: String, trim: true },
});
//# sourceMappingURL=categories.schema.js.map