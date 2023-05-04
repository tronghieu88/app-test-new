import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entities';
import { LoggerModule } from '../logger/logger.module';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { createKeyword, createSlug } from 'src/utils/string.utils';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // schema.pre(/^find/, function () {
          schema.pre('find', function () {
            this.find({ isDeleted: { $ne: true } });
          });
          schema.pre('save', function () {
            this.slug = createSlug(this.userName);
            this.keyword = createKeyword(this.slug);
          });
          return schema;
        },
      },
    ]),
    LoggerModule,
    // forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
