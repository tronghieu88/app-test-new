import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService,
  ) {}
  transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      host: this.configService.get<string>('mail.EMAIL_HOST'),
      port: this.configService.get<number>('mail.EMAIL_PORT'),
      auth: {
        user: this.configService.get<string>('mail.EMAIL_USERNAME'),
        pass: this.configService.get<string>('mail.EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(
    email: string,
    subject: string,
    html: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return await this.transporter().sendMail({
      from: this.configService.get<string>('mail.EMAIL_ADDRESS'),
      to: email,
      subject: subject,
      html: html,
    });
  }

  async generateToken(email: string): Promise<string> {
    const token = await this.jwtService.sign(
      { email },
      {
        secret: this.configService.get<string>(
          'mail.JWT_VERIFICATION_EMAIL_TOKEN_SECRET',
        ),
        expiresIn: parseInt(
          this.configService.get<string>(
            'mail.JWT_VERIFICATION_EXPIRATION_TIME',
          ),
        ),
      },
    );
    return token;
  }

  async confirmEmail(email: string, code: number): Promise<boolean> {
    const user = await this.userService.getOne({ email });

    if (!user) {
      throw new UnauthorizedException("This token can't use with email");
    }
    if (user.isConfirmMail) {
      throw new BadRequestException('Email đã được xác thực');
    }

    await this.userService.findOneAndUpdate(
      { email },
      { $set: { isConfirmMail: true } },
    );

    return true;
  }
}
