import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IProduct } from '../interfaces/product';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Transform } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entities';

@ObjectType()
export class ProductResult implements IResult<Product> {
  @Field(() => [Product], { nullable: true })
  results: Product[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}

@ObjectType()
export class Product implements IProduct {
  // @Transform(({ value }) => value.toString())
  // @Field(() => ID)
  // _id?: mongoose.Types.ObjectId;

  // @Prop({ required: true, unique: true, _id: false })
  // @Field(() => ID)
  // _id: mongoose.Types.ObjectId;

  // @Prop({ _id: false })
  // @Field(() => ID)
  // id: string;

  // @Field(() => ID)
  // _id: string;

  @Field(() => ID)
  productId: string;

  @Field(() => String)
  productName: string;

  @Field(() => Number, { nullable: true })
  quantity: number;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => [String], { nullable: true })
  urlImage: string[];

  @Field({ nullable: true })
  discount?: number;

  @Field({ nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  colors?: string[];

  @Field({ nullable: true })
  rating: number;

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

  @Field(() => Category, { nullable: true })
  category: Category;
}
// export const ProductSchema = SchemaFactory.createForClass(Product);
