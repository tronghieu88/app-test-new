import { Controller, Get, Query, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getSession(@Session() session: Record<string, any>) {
    // console.log(session);
    await this.authService.generateTokenLinkConfirmMail(session);
  }

  @Get('verify-email')
  async verifyEmail(
    @Query() params: any,
    @Session() session: Record<string, any>,
  ) {
    // console.log('Verify thanh cong');
    // console.log(params);
    // console.log('Sesion');
    // console.log(session.mailotp);
    return await this.authService.verifyMailLink(params, session);
  }
}
