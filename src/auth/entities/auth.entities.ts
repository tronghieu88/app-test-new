import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IAuthenticateResponse } from '../interfaces/auth.interfaces';

@ObjectType()
export class JwtPayload implements IAuthenticateResponse {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
}

@ObjectType()
export class IJwtPayload {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  userName: string;
}

@ObjectType()
export class UserOTP {
  @Field(() => String)
  mail: string;

  @Field(() => Number)
  code: number;
}
