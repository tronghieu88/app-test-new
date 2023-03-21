import { Field, InputType } from '@nestjs/graphql';
import { IUser } from '../user.interface';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
  IsStrongPasswordOptions,
} from 'class-validator';

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
