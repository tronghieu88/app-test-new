import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { RoleEnum } from 'src/constants/enum';

import { IUser } from '../interfaces/user.interface';

export type UserDocument = HydratedDocument<User>;
// ObjectType: de tra ve cac gia tri cho api
@ObjectType()
export class UserResult implements IResult<User> {
  @Field(() => [User], { nullable: true })
  results: User[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}

@Schema()
@ObjectType()
export class User implements IUser {
  @Transform(({ value }) => value.toString())
  @Field(() => ID)
  _id?: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  @Field()
  userName: string;

  @Prop(String)
  @Field()
  // @HideField()
  password: string;

  @IsEmail()
  @Prop(String)
  @Field({ nullable: true })
  email?: string;

  @IsPhoneNumber('VN')
  @Prop(String)
  @Field({ nullable: true })
  phoneNumber?: string;

  @Prop(Number)
  @Field({ nullable: true })
  age?: number;

  @Prop(String)
  @Field({ nullable: true })
  description?: string;

  @Prop({ default: new Date() })
  @Field(() => Date)
  createdAt?: Date;

  @Prop({ default: false })
  @Field(() => Boolean)
  // @HideField()
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

  // @HideField()
  @Prop({ String, default: RoleEnum.USER })
  @Field()
  role?: RoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
