"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_resolver_1 = require("./users.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const user_entities_1 = require("./entities/user.entities");
const logger_module_1 = require("../logger/logger.module");
const users_controller_1 = require("./users.controller");
const string_utils_1 = require("../utils/string.utils");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: user_entities_1.User.name,
                    useFactory: () => {
                        const schema = user_entities_1.UserSchema;
                        schema.pre('find', function () {
                            this.find({ isDeleted: { $ne: true } });
                        });
                        schema.pre('save', function () {
                            this.slug = (0, string_utils_1.createSlug)(this.userName);
                            this.keyword = (0, string_utils_1.createKeyword)(this.slug);
                        });
                        return schema;
                    },
                },
            ]),
            logger_module_1.LoggerModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_resolver_1.UsersResolver, users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map