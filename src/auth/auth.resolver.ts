import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload } from './entities/auth.entities';
import { UseGuards } from '@nestjs/common';
import { LoginAccessGuard } from 'src/guard/loginAccess.guard';
import { Session } from 'src/decorators/session.decorator';

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
}
