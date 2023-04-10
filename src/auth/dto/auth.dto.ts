import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  mail: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field()
  mail: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;

  @Field({ nullable: true })
  userName: string;

  @Field({ nullable: true })
  phoneNumber: string;
}
