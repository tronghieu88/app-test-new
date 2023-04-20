import { Field, InputType } from '@nestjs/graphql';
import { ICategory } from '../interfaces/category';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CategoryInput implements ICategory {
  @IsNotEmpty()
  @Field(() => String)
  categoryId: string;

  @Field(() => String, { nullable: true })
  categoryName: string;

  @Field(() => String, { nullable: true })
  description: string;
}
