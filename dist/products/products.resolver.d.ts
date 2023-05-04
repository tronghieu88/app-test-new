import { ProductsService } from './products.service';
import { ProductInput } from './dto/product.dto';
import { Product, ProductResult } from './entities/product.entities';
import { SortProduct } from 'src/constants/enum';
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    test1(): string;
    createProduct(productInput: ProductInput): Promise<Product>;
    findProduct(productName: string): Promise<Product | null>;
    findWithProductName(input: string): Promise<ProductResult>;
    getAllProduct(): Promise<ProductResult>;
    deleteProduct(productID: ProductInput): Promise<Boolean>;
    updateProduct(productId: string, productInput: ProductInput): Promise<Boolean>;
    sortProduct(input: SortProduct, option: number): Promise<ProductResult>;
    getTestProduct(): Promise<ProductResult>;
}
