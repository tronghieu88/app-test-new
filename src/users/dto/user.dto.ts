import { Field, HideField, InputType } from '@nestjs/graphql';
import { IUser } from '../user.interface';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  IsStrongPasswordOptions,
} from 'class-validator';
import { RegisterType } from 'src/constants/enum';

const options: IsStrongPasswordOptions = {
  minLength: 3,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
};

//InputType: de nguoi dung api nhap
@InputType()
export class UserInput implements IUser {
  @IsNotEmpty()
  @Field(() => String)
  userName: string;

  @IsStrongPassword(options)
  @IsNotEmpty()
  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  email: string;

  // @IsPhoneNumber('VN')
  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => Number, { nullable: true })
  age: number;

  @Field(() => String, { nullable: true })
  description: string;
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

  @HideField()
  registerType?: RegisterType;

  @HideField()
  resetPasswordCode?: string;
}
