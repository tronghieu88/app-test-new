import { InputType, Int, Field } from '@nestjs/graphql';
import { IProduct } from '../interfaces/product';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ProductInput implements IProduct {
  // @Field()
  // _id: string;

  // @Field()
  // id: string;

  @IsNotEmpty()
  @Field(() => String)
  productId: string;

  @Field(() => String, { nullable: true })
  productName: string;

  @Field(() => Number, { nullable: true })
  quantity: number;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => [String], { nullable: true })
  urlImage?: string[];

  @Field(() => Number, { nullable: true })
  discount?: number;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  colors?: string[];

  @Field(() => Number, { nullable: true })
  rating: number;
}
