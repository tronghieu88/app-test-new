import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
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

  async signIn(input: LoginInput): Promise<JwtPayload> {
    try {
      const user = await this.userService.signIn(input);
      // console.log('user----' + user);
      return await this.generateTokens(user._id.toString());
    } catch (error) {
      throw error;
    }
  }

  async signUp(register: RegisterInput): Promise<boolean> {
    const code = randomCode();

    const user = await this.userService.signUp(register);
    const email = user.email;
    await this.userService.findOneAndUpdate(
      { email },
      { $set: { codeMail: code } },
    );
    const html = VerifyMailAccount.createHTML(code.toString());
    await this.mailService.sendMail(user.email, 'Verify your account', html);
    return true;
  }
}
