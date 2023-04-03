import { Field, HideField, InputType, registerEnumType } from '@nestjs/graphql';
import { IUser } from '../interfaces/user.interface';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  IsStrongPasswordOptions,
} from 'class-validator';
import { RegisterType, RoleEnum } from 'src/constants/enum';

const options: IsStrongPasswordOptions = {
  minLength: 3,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
};
registerEnumType(RoleEnum, { name: 'RoleEnum' });
//InputType: de nguoi dung api nhap
@InputType()
export class UserInput implements IUser {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  // @IsStrongPassword(options)
  // @IsNotEmpty()
  @Field(() => String, { nullable: true })
  password: string;

  // @IsNotEmpty()
  @Field(() => String, { nullable: true })
  userName: string;
  // @IsPhoneNumber('VN')
  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => Number, { nullable: true })
  age: number;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => RoleEnum, { nullable: true })
  role: RoleEnum;
}

@InputType()
export class FilterGetOneUser implements Partial<IUser> {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  slug?: string;

  @IsOptional()
  @Field({ nullable: true })
  userName?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @HideField()
  registerType?: RegisterType;

  @HideField()
  resetPasswordCode?: string;
}

@InputType()
export class UpdateCurrentUser implements Partial<IUser> {
  // @IsNotEmpty()
  @Field(() => String, { nullable: true })
  userName: string;
  // @IsPhoneNumber('VN')
  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => Number, { nullable: true })
  age: number;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => RoleEnum, { nullable: true })
  role: RoleEnum;
}
