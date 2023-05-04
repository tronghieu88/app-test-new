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
exports.UserOTP = exports.IJwtPayload = exports.JwtPayload = void 0;
const graphql_1 = require("@nestjs/graphql");
let JwtPayload = class JwtPayload {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], JwtPayload.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], JwtPayload.prototype, "refreshToken", void 0);
JwtPayload = __decorate([
    (0, graphql_1.ObjectType)()
], JwtPayload);
exports.JwtPayload = JwtPayload;
let IJwtPayload = class IJwtPayload {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], IJwtPayload.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], IJwtPayload.prototype, "userName", void 0);
IJwtPayload = __decorate([
    (0, graphql_1.ObjectType)()
], IJwtPayload);
exports.IJwtPayload = IJwtPayload;
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
//# sourceMappingURL=auth.entities.js.map