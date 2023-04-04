import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload } from './entities/auth.entities';

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

  @Mutation(() => Boolean)
  signUp(
    @Args('input', { type: () => RegisterInput }) input: RegisterInput,
  ): Promise<boolean> {
    try {
      return this.authService.signUp(input);
    } catch (error) {
      throw error;
    }
  }
}
