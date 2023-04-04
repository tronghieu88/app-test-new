import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}
