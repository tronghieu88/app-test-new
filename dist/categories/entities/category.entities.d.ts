import { ICategory } from '../interfaces/category';
import mongoose from 'mongoose';
export declare class CategoryResult implements IResult<Category> {
    results: Category[];
    totalCount: number;
}
export declare class Category implements ICategory {
    _id?: mongoose.Types.ObjectId;
    categoryId: string;
    categoryName: string;
    description: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    slug?: string;
    keyword?: string;
}
