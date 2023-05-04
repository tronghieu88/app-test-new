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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_dto_1 = require("./dto/user.dto");
const user_entities_1 = require("./entities/user.entities");
const users_service_1 = require("./users.service");
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../guard/role.guard");
const roles_deco_1 = require("../constants/roles.deco");
const enum_1 = require("../constants/enum");
const loginAccess_guard_1 = require("../guard/loginAccess.guard");
const getuser_decorators_1 = require("../decorators/getuser.decorators");
const session_decorator_1 = require("../decorators/session.decorator");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    test() {
        return 'Khong thay doi du lieu';
    }
    testMutation() {
        return 'Thay doi du lieu';
    }
    async createUser(userInput) {
        return await this.usersService.create(userInput);
    }
    async getAllUser() {
        return await this.usersService.getAll();
    }
    async findOne(findOneUser) {
        const userfind = await this.usersService.findOne(findOneUser);
        return userfind;
    }
    async deleteOne(Delete) {
        return await this.usersService.deleteOne(Delete);
    }
    async sortUserName(option) {
        return await this.usersService.getAllAndSortUserName(option);
    }
    async updateOne(email, userInput) {
        const userNew = await this.usersService.updateOne(email, userInput);
        return userNew;
    }
    async updateCurrentUser(user, updateCurrentUser) {
        const userNew = await this.usersService.updateCurrentUser(user, updateCurrentUser);
        return userNew;
    }
    async confirmCode(code, session) {
        await this.usersService.confirmCode(session, code);
        return true;
    }
    getCurrentUser(user) {
        return user;
    }
    async getSession(session) {
        console.log('---------------');
        console.log(session.session);
        return true;
    }
    async onlyChangePassword(input) {
        await this.usersService.onlyChangePassword(input);
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "test", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "testMutation", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entities_1.User),
    __param(0, (0, graphql_1.Args)({ name: 'userInput', type: () => user_dto_1.UserInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.UserResult),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getAllUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.User),
    __param(0, (0, graphql_1.Args)({ name: 'findOneUser', type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(loginAccess_guard_1.LoginAccessGuard, role_guard_1.RolesGuard),
    (0, roles_deco_1.hasRoles)(enum_1.RoleEnum.ADMIN),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'Delete', type: () => user_dto_1.UserInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteOne", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.UserResult),
    (0, common_1.UseGuards)(loginAccess_guard_1.LoginAccessGuard, role_guard_1.RolesGuard),
    (0, roles_deco_1.hasRoles)(enum_1.RoleEnum.ADMIN, enum_1.RoleEnum.USER),
    __param(0, (0, graphql_1.Args)({
        name: 'option',
        type: () => Number,
        description: 'Sort A-Z: 1 \nSort Z-A: -1',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "sortUserName", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'email', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'userInput', type: () => user_dto_1.UserInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateOne", null);
__decorate([
    (0, common_1.UseGuards)(loginAccess_guard_1.LoginAccessGuard),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __param(1, (0, graphql_1.Args)({ name: 'updateCurrentUser', type: () => user_dto_1.UpdateCurrentUser })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User,
        user_dto_1.UpdateCurrentUser]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateCurrentUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'code', type: () => String })),
    __param(1, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "confirmCode", null);
__decorate([
    (0, graphql_1.Query)(() => user_entities_1.User),
    (0, common_1.UseGuards)(loginAccess_guard_1.LoginAccessGuard),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User]),
    __metadata("design:returntype", user_entities_1.User)
], UsersResolver.prototype, "getCurrentUser", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __param(0, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'input', type: () => user_dto_1.ChangePasswordInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ChangePasswordInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "onlyChangePassword", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)('User'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map