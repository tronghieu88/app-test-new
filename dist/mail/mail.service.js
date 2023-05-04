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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
let MailService = class MailService {
    constructor(jwtService, userService, configService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.configService = configService;
    }
    transporter() {
        return nodemailer.createTransport({
            host: this.configService.get('mail.EMAIL_HOST'),
            port: this.configService.get('mail.EMAIL_PORT'),
            auth: {
                user: this.configService.get('mail.EMAIL_USERNAME'),
                pass: this.configService.get('mail.EMAIL_PASSWORD'),
            },
        });
    }
    async sendMail(email, subject, html) {
        return await this.transporter().sendMail({
            from: this.configService.get('mail.EMAIL_ADDRESS'),
            to: email,
            subject: subject,
            html: html,
        });
    }
    async generateToken(email) {
        const token = await this.jwtService.sign({ email }, {
            secret: this.configService.get('mail.JWT_VERIFICATION_EMAIL_TOKEN_SECRET'),
            expiresIn: parseInt(this.configService.get('mail.JWT_VERIFICATION_EXPIRATION_TIME')),
        });
        return token;
    }
    async confirmEmail(mail, code) {
        const user = await this.userService.getOne({ mail });
        if (!user) {
            throw new common_1.UnauthorizedException("This token can't use with email");
        }
        if (user.isConfirmMail) {
            throw new common_1.BadRequestException('Email đã được xác thực');
        }
        if (user.codeMail !== code) {
            throw new common_1.BadRequestException('Code đã nhập không chính xác!');
        }
        await this.userService.findOneAndUpdate({ mail }, { $set: { isConfirmMail: true } });
        return true;
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map