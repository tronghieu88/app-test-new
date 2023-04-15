import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IProduct } from '../interfaces/product';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Transform } from 'class-transformer';

@ObjectType()
export class ProductResult implements IResult<Product> {
  @Field(() => [Product], { nullable: true })
  results: Product[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}

@Schema()
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

  @Prop({ required: true })
  @Field(() => String)
  productId: string;

  @Prop(String)
  @Field(() => String)
  productName: string;

  @Prop({ default: 1 })
  @Field(() => Number, { nullable: true })
  quantity: number;

  @Prop({ default: 1000 })
  @Field(() => Number, { nullable: true })
  price: number;

  @Prop({ default: [], type: [String] })
  @Field(() => [String], { nullable: true })
  urlImage: string[];

  @Prop(Number)
  @Field({ nullable: true })
  discount?: number;

  @Prop(String)
  @Field()
  description: string;

  @Prop({ default: [], type: [String] })
  @Field(() => [String], { nullable: true })
  colors?: string[];

  @Prop({ default: 0 })
  @Field({ nullable: true })
  rating: number;

  @Prop({ default: false })
  @Field(() => Boolean)
  isDeleted?: boolean;

  @Prop({ default: new Date() })
  @Field(() => Date)
  createdAt?: Date;

  @Prop({ default: new Date() })
  @Field(() => Date)
  updatedAt?: Date;

  @Prop(String)
  @Field(() => String)
  slug?: string;

  @Prop(String)
  @Field(() => String)
  keyword?: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
