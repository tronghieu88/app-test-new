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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const utils_1 = require("../utils/utils");
const logger_service_1 = require("../logger/logger.service");
const mail_service_1 = require("../mail/mail.service");
const verify_mail_1 = require("../mail/templates/verify.mail");
const crypto = require("crypto");
const forgotPassword_mail_1 = require("../mail/templates/forgotPassword.mail");
const successVerify_mail_1 = require("../mail/templates/successVerify.mail");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService, loggerService, mailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.loggerService = loggerService;
        this.mailService = mailService;
        this.loggerService.setContext('AuthService');
    }
    async generateTokens(_id) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ _id }, {
                secret: this.configService.get('token.JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: parseInt(this.configService.get('token.JWT_ACCESS_TOKEN_EXPIRATION_TIME')),
            }),
            this.jwtService.signAsync({ _id }, {
                secret: this.configService.get('token.JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: parseInt(this.configService.get('token.JWT_REFRESH_TOKEN_EXPIRATION_TIME')),
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async hashMD5(input) {
        const md5Hash = crypto.createHash('md5');
        md5Hash.update(input);
        const hashedString = md5Hash.digest('hex');
        return hashedString;
    }
    async signIn(input) {
        try {
            const user = await this.userService.signIn(input);
            return await this.generateTokens(user._id.toString());
        }
        catch (error) {
            throw error;
        }
    }
    async signUp(register, context) {
        const code = (0, utils_1.randomCode)();
        const email = register.mail;
        const userExisting = await this.userService.getOne({ mail: email });
        if (userExisting) {
            throw new common_1.BadRequestException('Email đã tồn tại');
        }
        if (register.password != register.confirmPassword) {
            throw new common_1.BadRequestException('Mật khẩu không khớp');
        }
        const mail = register.mail;
        const password = register.password;
        const string = mail + password + code;
        const token = await this.hashMD5(string);
        const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
        console.log('Link verify: ' + verificationLink);
        const html = verify_mail_1.VerifyMailAccount.createHTML(code.toString(), verificationLink.toString());
        await this.mailService.sendMail(mail, 'Verify your account', html);
        const session = context.session;
        if (session) {
            session.testSession = 'haha';
            session.mailotp = Object.assign(Object.assign({}, register), { code: code });
        }
        else {
            console.log('Session is null or undefined');
        }
        return true;
    }
    async verifyMailLink(params, session) {
        if (session.mailotp === undefined) {
            throw new common_1.UnprocessableEntityException('Link không được sử dụng!');
        }
        const { mail: mailSession, code: codeSession, password } = session.mailotp;
        const string = mailSession + password + codeSession;
        const tokenSession = await this.hashMD5(string);
        if (params.token != tokenSession) {
            throw new common_1.UnprocessableEntityException('Link không chính xác!');
        }
        await this.userService.signUp(session.mailotp, codeSession);
        const successHtml = successVerify_mail_1.SuccessVerifyMail.createHTML(mailSession);
        return successHtml;
    }
    async generateTokenLinkConfirmMail(session) {
        console.log(session.mailotp);
    }
    async forgotPassword(mail, context) {
        const userExisting = await this.userService.getOne({ mail });
        if (!userExisting) {
            throw new common_1.BadRequestException('Tài khoản chưa được đăng kí!');
        }
        const code = (0, utils_1.randomCode)();
        const html = forgotPassword_mail_1.ForgotPasswordMail.createHTML(code.toString());
        await this.mailService.sendMail(mail, 'Forgot password!', html);
        const session = context.session;
        if (session) {
            session.testSession = 'haha';
            session.mailotp = { mail: mail, code: code };
        }
        else {
            console.log('Session is null or undefined');
        }
    }
    async changePassword(context, code, newPassword, reNewPassword) {
        if (newPassword != reNewPassword) {
            throw new common_1.BadRequestException('Mật khẩu đã nhập không khớp!');
        }
        const session = context.session;
        if (session.mailotp === undefined) {
            console.log('Session is null or undefined');
            throw new common_1.BadRequestException('OTP đã hết hạn!');
        }
        if (session.mailotp.code != code) {
            throw new common_1.BadRequestException('OTP không khớp!');
        }
        const mail = session.mailotp.mail;
        await this.userService.changePassword(mail, newPassword, reNewPassword);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        logger_service_1.LoggerService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map