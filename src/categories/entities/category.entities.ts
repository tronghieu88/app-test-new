import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ICategory } from '../interfaces/category';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';

@ObjectType()
export class CategoryResult implements IResult<Category> {
  @Field(() => [Category], { nullable: true })
  results: Category[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}

@ObjectType()
export class Category implements ICategory {
  @Transform(({ value }) => value.toString())
  @Field(() => ID)
  _id?: mongoose.Types.ObjectId;

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

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  keyword?: string;
}
