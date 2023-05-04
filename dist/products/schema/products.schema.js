"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const category_entities_1 = require("../../categories/entities/category.entities");
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    productId: { type: String, trim: true, required: true },
    productName: { type: String, trim: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 1000 },
    urlImage: { type: [String], default: [], trim: true },
    discount: { type: Number },
    description: { type: String, trim: true },
    colors: { type: [String], trim: true },
    rating: { type: Number },
    createdAt: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
    updatedAt: { type: Date, default: new Date() },
    slug: { type: String, trim: true },
    keyword: { type: String, trim: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: category_entities_1.Category.name,
        autopopulate: { maxDepth: 1 },
    },
});
//# sourceMappingURL=products.schema.js.map