import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import variable from './configs/env.variable';
import { MongooseConfigService } from './configs/mongodb.config';
import { MailModule } from './mail/mail.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '../../../tmp/schema.gql'),
      // context: ({ req }) => ({ session: req.session }),
    }),
    UsersModule,

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    LoggerModule,
    AuthModule,
    ConfigModule.forRoot({ load: [variable], isGlobal: true }),
    MailModule,
    ProductsModule,
    CategoriesModule,
  ],

  providers: [],
})
export class AppModule {}
