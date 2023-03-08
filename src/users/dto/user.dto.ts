import { Field, InputType } from '@nestjs/graphql';
import { IUser } from '../user.interface';
//InputType: de nguoi dung api nhap
@InputType()
export class UserInput implements IUser {
  @Field(() => String)
  userName: string;

  @Field(() => String)
  password: string;
}
