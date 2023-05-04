import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload } from './entities/auth.entities';
import { LoggerService } from 'src/logger/logger.service';
import { MailService } from 'src/mail/mail.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    private loggerService;
    private mailService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService, loggerService: LoggerService, mailService: MailService);
    generateTokens(_id: string): Promise<JwtPayload>;
    hashMD5(input: string): Promise<string>;
    signIn(input: LoginInput): Promise<JwtPayload>;
    signUp(register: RegisterInput, context: any): Promise<boolean>;
    verifyMailLink(params: any, session: any): Promise<string>;
    generateTokenLinkConfirmMail(session: any): Promise<void>;
    forgotPassword(mail: string, context: any): Promise<void>;
    changePassword(context: any, code: string, newPassword: string, reNewPassword: string): Promise<void>;
}
