import {
  BadRequestException,
  ExecutionContext,
  Inject,
  Injectable,
  Session,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { randomCode } from 'src/utils/utils';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload } from './entities/auth.entities';
import { LoggerService } from 'src/logger/logger.service';
import { MailVerifyAccount } from 'src/mail/templates/mail.verify';
import { MailService } from 'src/mail/mail.service';
import { VerifyMailAccount } from 'src/mail/templates/verify.mail';
import { Context } from '@nestjs/graphql';
import * as crypto from 'crypto';
import { ForgotPasswordMail } from 'src/mail/templates/forgotPassword.mail';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private loggerService: LoggerService,
    private mailService: MailService,
  ) {
    this.loggerService.setContext('AuthService');
  }

  async generateTokens(_id: string): Promise<JwtPayload> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { _id },
        {
          // secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          secret: this.configService.get<string>(
            'token.JWT_ACCESS_TOKEN_SECRET',
          ),
          // expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
          expiresIn: parseInt(
            this.configService.get<string>(
              'token.JWT_ACCESS_TOKEN_EXPIRATION_TIME',
            ),
          ),
        },
      ),
      this.jwtService.signAsync(
        { _id },
        {
          // secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          secret: this.configService.get<string>(
            'token.JWT_REFRESH_TOKEN_SECRET',
          ),
          // expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
          expiresIn: parseInt(
            this.configService.get<string>(
              'token.JWT_REFRESH_TOKEN_EXPIRATION_TIME',
            ),
          ),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async hashMD5(input: string): Promise<string> {
    const md5Hash = crypto.createHash('md5');
    md5Hash.update(input);
    const hashedString = md5Hash.digest('hex');
    return hashedString;
  }

  async signIn(input: LoginInput): Promise<JwtPayload> {
    try {
      const user = await this.userService.signIn(input);
      // console.log('user----' + user);
      return await this.generateTokens(user._id.toString());
    } catch (error) {
      throw error;
    }
  }

  async signUp(register: RegisterInput, context): Promise<boolean> {
    const code = randomCode();
    const email = register.mail;
    const userExisting = await this.userService.getOne({ mail: email });

    if (userExisting) {
      throw new BadRequestException('Email đã tồn tại');
    }

    if (register.password != register.confirmPassword) {
      throw new BadRequestException('Mật khẩu không khớp');
    }
    // const user = await this.userService.signUp(register);
    // const email = user.email;
    // await this.userService.findOneAndUpdate(
    //   { email },
    //   { $set: { codeMail: code } },
    // );
    const mail = register.mail;
    const password = register.password;

    const string = mail + password + code;

    const token = await this.hashMD5(string);

    // const verificationLink = `http://localhost:3000/auth/verify-email?mail=${mail}&code=${code}`;
    const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
    console.log('Link verify: ' + verificationLink);
    const html = VerifyMailAccount.createHTML(
      code.toString(),
      verificationLink.toString(),
    );

    await this.mailService.sendMail(mail, 'Verify your account', html);

    // session.mailotp = { mail: email, code: code };

    const session = context.session;
    if (session) {
      session.testSession = 'haha';
      session.mailotp = {
        ...register,
        code: code,
      };
      // console.log(session);
    } else {
      console.log('Session is null or undefined');
    }
    return true;
  }

  async verifyMailLink(params, session) {
    if (session.mailotp === undefined) {
      throw new UnprocessableEntityException('Link không được sử dụng!');
    }
    // const { mail: mailParams, code: codeParams } = params;
    const { mail: mailSession, code: codeSession, password } = session.mailotp;
    const string = mailSession + password + codeSession;
    const tokenSession = await this.hashMD5(string);
    // console.log('tokenSession ' + tokenSession);

    if (params.token != tokenSession) {
      throw new UnprocessableEntityException('Link không chính xác!');
    }
    // console.log('Giong nhau');
    await this.userService.signUp(session.mailotp, codeSession);
  }

  async generateTokenLinkConfirmMail(session) {
    // const userExisting = await this.getOne({ email });
    // if (userExisting) {
    //   throw new BadRequestException('Email đã tồn tại');
    // }
    // const token = await this.authService.generateTokens(code);
    // return token;
    console.log(session.mailotp);
  }

  async forgotPassword(mail: string, context) {
    const userExisting = await this.userService.getOne({ mail });
    if (!userExisting) {
      throw new BadRequestException('Tài khoản chưa được đăng kí!');
    }

    const code = randomCode();
    const html = ForgotPasswordMail.createHTML(code.toString());

    await this.mailService.sendMail(mail, 'Forgot password!', html);

    const session = context.session;
    if (session) {
      session.testSession = 'haha';
      session.mailotp = { mail: mail, code: code };
      // console.log(session);
    } else {
      console.log('Session is null or undefined');
    }
  }

  async changePassword(
    context,
    code: string,
    newPassword: string,
    reNewPassword: string,
  ) {
    if (newPassword != reNewPassword) {
      throw new BadRequestException('Mật khẩu đã nhập không khớp!');
    }

    const session = context.session;

    // console.log(session.mailotp);
    if (session.mailotp === undefined) {
      console.log('Session is null or undefined');
      throw new BadRequestException('OTP đã hết hạn!');
    }
    if (session.mailotp.code != code) {
      throw new BadRequestException('OTP không khớp!');
    }
    const mail = session.mailotp.mail;
    // console.log(mail);
    // console.log('otp khop');
    await this.userService.changePassword(mail, newPassword, reNewPassword);
  }
}
