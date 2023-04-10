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

@ObjectType()
export class UserOTP {
  @Field(() => String)
  mail: string;

  @Field(() => Number)
  code: number;
}

@Schema()
@ObjectType()
export class User implements IUser {
  @Transform(({ value }) => value.toString())
  @Field(() => ID)
  _id?: mongoose.Types.ObjectId;

  @IsEmail()
  @Field()
  // @Prop({ required: true })
  @Prop(String)
  mail: string;

  // @Prop({ required: true })
  @Prop(String)
  @Field()
  // @HideField()
  password: string;

  @Prop({
    default: function () {
      return this.mail.split('@')[0];
    },
  })
  @Field({ nullable: true })
  userName?: string;

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
  @Prop({ String, default: RoleEnum.GUEST })
  @Field()
  role?: RoleEnum;

  @Prop({ default: false })
  @Field(() => Boolean)
  isConfirmMail?: boolean;

  @Prop(Number)
  @Field({ nullable: true })
  codeMail?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
