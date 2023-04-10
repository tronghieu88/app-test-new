import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Session,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UsersController {
  // constructor(private authService: AuthService) {}

  @Get()
  async getSession(@Session() session: Record<string, any>) {
    // session.code = { mail: 'email', code: 451546 };
    // console.log(session.mailotp.code);
    // const { mail, code } = session.mailotp;
    // await this.authService.generateTokenLinkConfirmMail(
    //   session.mailotp.mail,
    //   session.mailotp.mail.code,
    // );
  }

  @Get('test')
  async getSession1(@Session() session: Record<string, any>) {
    if (session.code === undefined) {
      throw new BadRequestException('Code da het han');
    } else {
      console.log('first-------------------------');
      console.log(session);
    }
  }

  // @Get()
  // async postSession(@Session() session: Record<string, any>) {
  //   // console.log('type' + typeof session);
  //   if (session === undefined) {
  //     throw new BadRequestException('Code da het han');
  //   } else {
  //     console.log('first');
  //     console.log(session.mailotp.code);
  //   }
  // }
}
