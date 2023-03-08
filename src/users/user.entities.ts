import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';

import { IUser } from './user.interface';

export type UserDocument = HydratedDocument<User>;

@ObjectType()
export class UserResult implements IResult<User> {
  @Field(() => [User])
  results: User[];

  @Field(() => Number)
  totalCount: number;
}

@Schema()
@ObjectType()
export class User implements IUser {
  @Transform(({ value }) => value.toString())
  @Field(() => ID)
  _id?: mongoose.Types.ObjectId;

  @Prop(String)
  @Field()
  userName: string;

  @Prop(String)
  @Field()
  password: string;

  @Prop({ default: new Date() })
  @Field(() => Date)
  createdAt?: Date;

  @Prop({ default: false })
  @Field(() => Boolean)
  isDeleted?: boolean;

  @Prop(String)
  @Field()
  keyword?: string;

  @Prop({ default: new Date() })
  @Field(() => Date)
  updatedAt?: Date;

  @Prop(String)
  @Field()
  slug?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
