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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const products_service_1 = require("./products.service");
const product_dto_1 = require("./dto/product.dto");
const product_entities_1 = require("./entities/product.entities");
const common_1 = require("@nestjs/common");
const loginAccess_guard_1 = require("../guard/loginAccess.guard");
const role_guard_1 = require("../guard/role.guard");
const roles_deco_1 = require("../constants/roles.deco");
const enum_1 = require("../constants/enum");
let ProductsResolver = class ProductsResolver {
    constructor(productsService) {
        this.productsService = productsService;
    }
    test1() {
        return 'Khong thay doi du lieu';
    }
    async createProduct(productInput) {
        return await this.productsService.create(productInput);
    }
    async findProduct(productName) {
        const productFind = await this.productsService.findOne(productName);
        return productFind;
    }
    async findWithProductName(input) {
        return await this.productsService.findWithName(input);
    }
    async getAllProduct() {
        return await this.productsService.getAllProduct();
    }
    async deleteProduct(productID) {
        return await this.productsService.deleteOne(productID);
    }
    async updateProduct(productId, productInput) {
        const productNew = await this.productsService.updateOne(productId, productInput);
        return productNew;
    }
    async sortProduct(input, option) {
        return await this.productsService.sortProduct(input, option);
    }
    async getTestProduct() {
        return await this.productsService.getProductTest();
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "test1", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_entities_1.Product),
    __param(0, (0, graphql_1.Args)({ name: 'productInput', type: () => product_dto_1.ProductInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.Product),
    __param(0, (0, graphql_1.Args)({ name: 'productName', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "findProduct", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.ProductResult),
    __param(0, (0, graphql_1.Args)({ name: 'input', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "findWithProductName", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.ProductResult),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "getAllProduct", null);
__decorate([
    (0, common_1.UseGuards)(loginAccess_guard_1.LoginAccessGuard, role_guard_1.RolesGuard),
    (0, roles_deco_1.hasRoles)(enum_1.RoleEnum.ADMIN),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'productID', type: () => product_dto_1.ProductInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.UseGuards)(loginAccess_guard_1.LoginAccessGuard, role_guard_1.RolesGuard),
    (0, roles_deco_1.hasRoles)(enum_1.RoleEnum.ADMIN),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'productId', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'productInput', type: () => product_dto_1.ProductInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.ProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "updateProduct", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.ProductResult),
    __param(0, (0, graphql_1.Args)({ name: 'input', type: () => enum_1.SortProduct })),
    __param(1, (0, graphql_1.Args)({ name: 'option', type: () => Number })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "sortProduct", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.ProductResult),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "getTestProduct", null);
ProductsResolver = __decorate([
    (0, graphql_1.Resolver)('Product'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsResolver);
exports.ProductsResolver = ProductsResolver;
//# sourceMappingURL=products.resolver.js.map