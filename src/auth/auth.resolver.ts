import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload } from './entities/auth.entities';
import { UseGuards } from '@nestjs/common';
import { LoginAccessGuard } from 'src/guard/loginAccess.guard';
import { Session } from 'src/decorators/session.decorator';
import { async } from 'rxjs';
import session from 'express-session';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => JwtPayload)
  signIn(
    @Args('input', { type: () => LoginInput }) input: LoginInput,
  ): Promise<JwtPayload> {
    try {
      // console.log(input);
      return this.authService.signIn(input);
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(LocalAccessGuard)
  @Mutation(() => Boolean)
  signUp(
    @Args('input', { type: () => RegisterInput }) input: RegisterInput,
    @Session() session,
  ): Promise<boolean> {
    try {
      return this.authService.signUp(input, session);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => Boolean)
  async forgotPassword(
    @Args({ name: 'mail', type: () => String }) mail: string,
    @Session() session,
  ): Promise<boolean> {
    try {
      await this.authService.forgotPassword(mail, session);
      return true;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async changePassword(
    @Session() session,
    @Args({ name: 'code', type: () => String }) code: string,
    @Args({ name: 'newPassword', type: () => String }) newPassword: string,
    @Args({ name: 'reNewPassword', type: () => String }) reNewPassword: string,
  ): Promise<boolean> {
    await this.authService.changePassword(
      session,
      code,
      newPassword,
      reNewPassword,
    );
    return true;
  }
}
