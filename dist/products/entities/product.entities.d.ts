import { IProduct } from '../interfaces/product';
import mongoose from 'mongoose';
import { Category } from 'src/categories/entities/category.entities';
export declare class ProductResult implements IResult<Product> {
    results: Product[];
    totalCount: number;
}
export declare class Product implements IProduct {
    _id?: mongoose.Types.ObjectId;
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
    categoryId: Category;
}
