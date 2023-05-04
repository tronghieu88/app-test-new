import { IProduct } from '../interfaces/product';
export declare class ProductInput implements IProduct {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    urlImage?: string[];
    discount?: number;
    description: string;
    colors?: string[];
    rating: number;
    categoryId: string;
}
