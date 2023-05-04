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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const category_entities_1 = require("./entities/category.entities");
const logger_service_1 = require("../logger/logger.service");
const mongoose_1 = require("@nestjs/mongoose");
let CategoriesService = class CategoriesService {
    constructor(categoryModel, loggerService) {
        this.categoryModel = categoryModel;
        this.loggerService = loggerService;
        this.loggerService.setContext('CategoryService');
    }
    async create(categoryInput) {
        return await this.categoryModel.create(categoryInput);
    }
    async getAllCategory() {
        const results = await this.categoryModel.find();
        const totalCount = results.length;
        return { results, totalCount };
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_entities_1.Category.name)),
    __metadata("design:paramtypes", [Object, logger_service_1.LoggerService])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map