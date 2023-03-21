import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Logger {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
