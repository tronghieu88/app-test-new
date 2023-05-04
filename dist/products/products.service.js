"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_entities_1 = require("./entities/product.entities");
const logger_service_1 = require("../logger/logger.service");
const model_utils_1 = require("../utils/model.utils");
let ProductsService = class ProductsService {
    constructor(productModel, loggerService) {
        this.productModel = productModel;
        this.loggerService = loggerService;
        this.loggerService.setContext('ProductService');
    }
    async create(productInput) {
        return await this.productModel.create(productInput);
    }
    async findOne(productName) {
        const product = await this.productModel.findOne({
            productName: productName,
        });
        (0, model_utils_1.throwIfNotExists)(product, 'Không tìm thấy sản phẩm!');
        return product;
    }
    async findWithName(input) {
        const results = await this.productModel.find({
            productName: { $regex: input, $options: 'i' },
        });
        const totalCount = results.length;
        return { results, totalCount };
    }
    async getAllProduct() {
        const results = await this.productModel.find();
        const totalCount = results.length;
        return { results, totalCount };
    }
    async deleteOne(productInput) {
        const productUpdate = await this.productModel.findOneAndUpdate({ productId: productInput.productId }, { $set: { isDeleted: true } });
        return productUpdate ? true : false;
    }
    async updateOne(productID, productInput) {
        const { productId } = productInput, productUpdate = __rest(productInput, ["productId"]);
        const productNew = await this.productModel.findOneAndUpdate({ productId: productID }, productUpdate, { new: true });
        return productNew ? true : false;
    }
    async sortProduct(input, option) {
        const sortBy = input;
        const sortOrder = option;
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 1 ? 1 : -1;
        const query = await this.productModel.find({}).sort(sortOptions);
        const results = query;
        const totalCount = results.length;
        return { results, totalCount };
    }
    async getProductTest() {
        const test = await this.productModel.find({
            categoryId: '643bc5a26ddcff1e95a3604a',
        });
        const results = test;
        const totalCount = results.length;
        return { results, totalCount };
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entities_1.Product.name)),
    __metadata("design:paramtypes", [Object, logger_service_1.LoggerService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map