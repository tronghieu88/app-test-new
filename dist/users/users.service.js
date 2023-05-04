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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const logger_service_1 = require("../logger/logger.service");
const model_utils_1 = require("../utils/model.utils");
const user_entities_1 = require("./entities/user.entities");
let UsersService = class UsersService {
    constructor(userModel, loggerService) {
        this.userModel = userModel;
        this.loggerService = loggerService;
        this.loggerService.setContext('UserService');
    }
    async create(userInput) {
        const userExist = await this.userModel.findOne({ mail: userInput.mail });
        (0, model_utils_1.throwIfExisted)(userExist, 'Mail đã tồn tại!');
        const hashPassword = await this.hashPassword(userInput.password);
        userInput.password = hashPassword;
        return await this.userModel.create(userInput);
    }
    async findOne(userName) {
        const user = await this.userModel.findOne({ userName: userName });
        (0, model_utils_1.throwIfNotExists)(user, 'Không tìm thấy User!');
        return user;
    }
    async findOneFilter(filter) {
        try {
            const user = await this.userModel
                .findOne(filter)
                .select('-password,-slug,-keyword,-isConfirm,-registerType');
            (0, model_utils_1.throwIfNotExists)(user, 'Không tìm thấy User!');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOne(userInput) {
        const userUpdate = await this.userModel.findOneAndUpdate({ mail: userInput.mail }, { $set: { isDeleted: true } });
        return userUpdate ? true : false;
    }
    async findOneAndUpdate(filter, update) {
        try {
            const user = await this.userModel.findOneAndUpdate(filter, update, {
                new: true,
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async updateOne(mail, userInput) {
        const userNew = await this.userModel.findOneAndUpdate({ mail: mail }, {
            $set: {
                userName: userInput.userName,
                password: userInput.password,
                mail: mail,
                phoneNumber: userInput.phoneNumber,
                age: userInput.age,
                description: userInput.description,
                role: userInput.role,
            },
        }, {
            new: true,
        });
        return userNew ? true : false;
    }
    async updateCurrentUser(user, updateCurrentUser) {
        const userNew = await this.userModel.findOneAndUpdate({ mail: user.mail }, {
            $set: {
                userName: updateCurrentUser.userName,
                phoneNumber: updateCurrentUser.phoneNumber,
                age: updateCurrentUser.age,
                description: updateCurrentUser.description,
                role: updateCurrentUser.role,
            },
        }, {
            new: true,
        });
        return userNew ? true : false;
    }
    async getAll() {
        const results = await this.userModel.find();
        const totalCount = results.length;
        return { results, totalCount };
    }
    async getAllAndSortUserName(option) {
        let query;
        if (option === 1) {
            query = this.userModel.find().sort({ userName: 1 });
        }
        else {
            query = this.userModel.find().sort({ userName: -1 });
        }
        const [results, totalCount] = await Promise.all([
            query,
            this.userModel.countDocuments(),
        ]);
        return { results, totalCount };
    }
    async isNotCorrectPassword(password, currentPassword) {
        const compare = await bcrypt.compare(password, currentPassword);
        if (!compare) {
            throw new common_1.UnauthorizedException('Mật khẩu không chính xác');
        }
    }
    async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            return hashPassword;
        }
        catch (error) {
            throw error;
        }
    }
    async getOne(filter) {
        try {
            const user = await this.userModel.findOne(filter);
            return user ? user : undefined;
        }
        catch (error) {
            throw error;
        }
    }
    async signIn(input) {
        try {
            const user = await this.getOne({ mail: input.mail });
            (0, model_utils_1.throwIfNotExists)(user, 'Tài khoản không tồn tại!');
            if (!user.isConfirmMail) {
                throw new common_1.UnauthorizedException('Mail chưa được xác nhận. Vui lòng xác nhận mail của bạn');
            }
            await this.isNotCorrectPassword(input.password, user.password);
            this.loggerService.debug('Passed password');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async signUp(register, code) {
        try {
            const [user, hashPassword] = await Promise.all([
                this.userModel.create(register),
                this.hashPassword(register.password),
            ]);
            user.password = hashPassword;
            user.isConfirmMail = true;
            user.codeMail = code;
            return user.save();
        }
        catch (error) {
            throw error;
        }
    }
    async confirmCode(context, code) {
        const session = context.session;
        if (session.mailotp === undefined) {
            throw new common_1.BadRequestException('OTP đã hết hạn!');
        }
        if (session.mailotp.code != code) {
            throw new common_1.BadRequestException('OTP không khớp!');
        }
        const mail = session.mailotp;
        await this.signUp(mail, mail.code);
    }
    async onlyChangePassword(input) {
        try {
            const { mail, curentPassword, newPassword, reNewPassword } = input;
            const user = await this.getOne({ mail });
            (0, model_utils_1.throwIfNotExists)(user, 'Tài khoản không tồn tại!');
            await this.isNotCorrectPassword(curentPassword, user.password);
            await this.changePassword(mail, newPassword, reNewPassword);
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(mail, newPassword, reNewPassword) {
        if (newPassword != reNewPassword) {
            throw new common_1.BadRequestException('Mật khẩu đã nhập không khớp!');
        }
        const [user, hashPassword] = await Promise.all([
            this.userModel.findOne({ mail }),
            this.hashPassword(newPassword),
        ]);
        user.password = hashPassword;
        return user.save();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entities_1.User.name)),
    __metadata("design:paramtypes", [Object, logger_service_1.LoggerService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map