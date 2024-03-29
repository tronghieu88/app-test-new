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
  mail: string;

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

  // @Field(() => RoleEnum, { nullable: true })
  // isConfirmMail: boolean;

  // @Field(() => Number, { nullable: true })
  // codeMail: number;
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
  mail?: string;

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

@InputType()
export class ChangePasswordInput implements Partial<IUser> {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  mail: string;

  // @IsStrongPassword(options)
  // @IsNotEmpty()
  @Field(() => String)
  curentPassword: string;

  // @IsStrongPassword(options)
  // @IsNotEmpty()
  @Field(() => String)
  newPassword: string;

  // @IsStrongPassword(options)
  // @IsNotEmpty()
  @Field(() => String)
  reNewPassword: string;
}
