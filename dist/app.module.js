"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const users_module_1 = require("./users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const path_1 = require("path");
const logger_module_1 = require("./logger/logger.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const env_variable_1 = require("./configs/env.variable");
const mongodb_config_1 = require("./configs/mongodb.config");
const mail_module_1 = require("./mail/mail.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), '../../../tmp/schema.gql'),
                playground: true,
                introspection: true,
            }),
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongodb_config_1.MongooseConfigService,
            }),
            logger_module_1.LoggerModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({ load: [env_variable_1.default], isGlobal: true }),
            mail_module_1.MailModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map