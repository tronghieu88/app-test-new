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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.UserOTP = exports.UserResult = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const enum_1 = require("../../constants/enum");
let UserResult = class UserResult {
};
__decorate([
    (0, graphql_1.Field)(() => [User], { nullable: true }),
    __metadata("design:type", Array)
], UserResult.prototype, "results", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], UserResult.prototype, "totalCount", void 0);
UserResult = __decorate([
    (0, graphql_1.ObjectType)()
], UserResult);
exports.UserResult = UserResult;
let UserOTP = class UserOTP {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserOTP.prototype, "mail", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UserOTP.prototype, "code", void 0);
UserOTP = __decorate([
    (0, graphql_1.ObjectType)()
], UserOTP);
exports.UserOTP = UserOTP;
let User = class User {
};
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)(String),
    __metadata("design:type", String)
], User.prototype, "mail", void 0);
__decorate([
    (0, mongoose_1.Prop)(String),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: function () {
            return this.mail.split('@')[0];
        },
    }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('VN'),
    (0, mongoose_1.Prop)(String),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(Number),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)(String),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(String),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "keyword", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date() }),
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(String),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ String, default: enum_1.RoleEnum.GUEST }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "isConfirmMail", void 0);
__decorate([
    (0, mongoose_1.Prop)(Number),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "codeMail", void 0);
User = __decorate([
    (0, mongoose_1.Schema)(),
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.entities.js.map