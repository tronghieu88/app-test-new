import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ICategory } from '../interfaces/category';

@ObjectType()
export class CategoryResult implements IResult<Category> {
  @Field(() => [Category], { nullable: true })
  results: Category[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}

@ObjectType()
export class Category implements ICategory {
  @Field(() => ID)
  categoryId: string;

  @Field(() => String)
  categoryName: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Boolean)
  isDeleted?: boolean;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => String)
  slug?: string;

  @Field(() => String)
  keyword?: string;
}
