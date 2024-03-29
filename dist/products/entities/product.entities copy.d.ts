import { IProduct } from '../interfaces/product';
import mongoose from 'mongoose';
export declare class ProductResult implements IResult<Product> {
    results: Product[];
    totalCount: number;
}
export declare class Product implements IProduct {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    urlImage: string[];
    discount?: number;
    description: string;
    colors?: string[];
    rating: number;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    slug?: string;
    keyword?: string;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product>;
