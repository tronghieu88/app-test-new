"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const categories_resolver_1 = require("./categories.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const category_entities_1 = require("./entities/category.entities");
const categories_schema_1 = require("./schema/categories.schema");
const logger_module_1 = require("../logger/logger.module");
const string_utils_1 = require("../utils/string.utils");
let CategoriesModule = class CategoriesModule {
};
CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: category_entities_1.Category.name,
                    useFactory: () => {
                        const schema = categories_schema_1.CategorySchema;
                        schema.pre('find', function () {
                            this.find({ isDeleted: { $ne: true } });
                        });
                        schema.pre('save', function () {
                            this.slug = (0, string_utils_1.createSlug)(this.categoryName);
                            this.keyword = (0, string_utils_1.createKeyword)(this.slug);
                        });
                        return schema;
                    },
                },
            ]),
            logger_module_1.LoggerModule,
        ],
        providers: [categories_resolver_1.CategoriesResolver, categories_service_1.CategoriesService],
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;
//# sourceMappingURL=categories.module.js.map