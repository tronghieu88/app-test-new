import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { LoginAccessGuard } from 'src/guard/loginAccess.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'src/logger/logger.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [UsersModule, ConfigModule, LoggerModule],
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    LoginAccessGuard,
    JwtStrategy,
    MailService,
  ],
})
export class AuthModule {}
