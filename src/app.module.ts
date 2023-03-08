import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import mongoose from 'mongoose';
mongoose.set('debug', process.env.NODE_ENV === 'prod' ? false : true);
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './tmp/schema.gql'),
    }),
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/testnestjsnew'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
