import { Product, ProductResult } from './entities/product.entities';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';
import { ProductInput } from './dto/product.dto';
type ProductModelType = Model<Product>;
export declare class ProductsService {
    private productModel;
    private loggerService;
    constructor(productModel: ProductModelType, loggerService: LoggerService);
    create(productInput: ProductInput): Promise<Product>;
    findOne(productName: string): Promise<Product | null>;
    findWithName(input: string): Promise<ProductResult>;
    getAllProduct(): Promise<ProductResult>;
    deleteOne(productInput: ProductInput): Promise<Boolean>;
    updateOne(productID: string, productInput: ProductInput): Promise<Boolean>;
    sortProduct(input: any, option: number): Promise<ProductResult>;
    getProductTest(): Promise<ProductResult>;
}
export {};
