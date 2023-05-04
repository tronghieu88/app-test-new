"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_resolver_1 = require("./products.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const product_entities_1 = require("./entities/product.entities");
const logger_module_1 = require("../logger/logger.module");
const products_schema_1 = require("./schema/products.schema");
const string_utils_1 = require("../utils/string.utils");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: product_entities_1.Product.name,
                    useFactory: () => {
                        const schema = products_schema_1.ProductSchema;
                        schema.pre('find', function () {
                            this.find({ isDeleted: { $ne: true } });
                        });
                        schema.pre('save', function () {
                            this.slug = (0, string_utils_1.createSlug)(this.productName);
                            this.keyword = (0, string_utils_1.createKeyword)(this.slug);
                        });
                        return schema;
                    },
                },
            ]),
            logger_module_1.LoggerModule,
        ],
        providers: [products_resolver_1.ProductsResolver, products_service_1.ProductsService],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map