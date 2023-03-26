import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { LoginAccessGuard } from 'src/guard/loginAccess.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule],
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    LoginAccessGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}