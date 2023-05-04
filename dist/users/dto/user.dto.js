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
exports.ChangePasswordInput = exports.UpdateCurrentUser = exports.FilterGetOneUser = exports.UserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../constants/enum");
const options = {
    minLength: 3,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
};
(0, graphql_1.registerEnumType)(enum_1.RoleEnum, { name: 'RoleEnum' });
let UserInput = class UserInput {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "mail", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "userName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], UserInput.prototype, "age", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.RoleEnum, { nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "role", void 0);
UserInput = __decorate([
    (0, graphql_1.InputType)()
], UserInput);
exports.UserInput = UserInput;
let FilterGetOneUser = class FilterGetOneUser {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "mail", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "registerType", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "resetPasswordCode", void 0);
FilterGetOneUser = __decorate([
    (0, graphql_1.InputType)()
], FilterGetOneUser);
exports.FilterGetOneUser = FilterGetOneUser;
let UpdateCurrentUser = class UpdateCurrentUser {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateCurrentUser.prototype, "userName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateCurrentUser.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], UpdateCurrentUser.prototype, "age", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateCurrentUser.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.RoleEnum, { nullable: true }),
    __metadata("design:type", String)
], UpdateCurrentUser.prototype, "role", void 0);
UpdateCurrentUser = __decorate([
    (0, graphql_1.InputType)()
], UpdateCurrentUser);
exports.UpdateCurrentUser = UpdateCurrentUser;
let ChangePasswordInput = class ChangePasswordInput {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "mail", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "curentPassword", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "newPassword", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "reNewPassword", void 0);
ChangePasswordInput = __decorate([
    (0, graphql_1.InputType)()
], ChangePasswordInput);
exports.ChangePasswordInput = ChangePasswordInput;
//# sourceMappingURL=user.dto.js.map