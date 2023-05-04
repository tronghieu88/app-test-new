import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private jwtService;
    private userService;
    private configService;
    constructor(jwtService: JwtService, userService: UsersService, configService: ConfigService);
    transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    sendMail(email: string, subject: string, html: string): Promise<SMTPTransport.SentMessageInfo>;
    generateToken(email: string): Promise<string>;
    confirmEmail(mail: string, code: string): Promise<boolean>;
}
