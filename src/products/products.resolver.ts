import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';

import { ProductInput } from './dto/product.dto';
import { Product, ProductResult } from './entities/product.entities';
import { UseGuards } from '@nestjs/common';
import { LoginAccessGuard } from 'src/guard/loginAccess.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { hasRoles } from 'src/constants/roles.deco';
import { RoleEnum, SortProduct } from 'src/constants/enum';

@Resolver('Product')
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => String)
  test1() {
    return 'Khong thay doi du lieu';
  }

  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'productInput', type: () => ProductInput })
    productInput: ProductInput,
  ): Promise<Product> {
    return await this.productsService.create(productInput);
  }

  @Query(() => Product)
  async findProduct(
    @Args({ name: 'productName', type: () => String }) productName: string,
  ): Promise<Product | null> {
    const productFind = await this.productsService.findOne(productName);
    return productFind;
  }

  @Query(() => ProductResult)
  async findWithProductName(
    @Args({ name: 'input', type: () => String }) input: string,
  ): Promise<ProductResult> {
    return await this.productsService.findWithName(input);
  }

  @Query(() => ProductResult)
  async getAllProduct(): Promise<ProductResult> {
    return await this.productsService.getAllProduct();
  }

  @UseGuards(LoginAccessGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async deleteProduct(
    @Args({ name: 'productID', type: () => ProductInput, nullable: true })
    productID: ProductInput,
  ): Promise<Boolean> {
    return await this.productsService.deleteOne(productID);
  }

  @UseGuards(LoginAccessGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  @Mutation(() => Boolean)
  async updateProduct(
    @Args({ name: 'productId', type: () => String }) productId: string,
    @Args({ name: 'productInput', type: () => ProductInput })
    productInput: ProductInput,
  ): Promise<Boolean> {
    const productNew = await this.productsService.updateOne(
      productId,
      productInput,
    );
    return productNew;
  }

  @Query(() => ProductResult)
  async sortProduct(
    @Args({ name: 'input', type: () => SortProduct }) input: SortProduct,
    @Args({ name: 'option', type: () => Number }) option: number,
  ): Promise<ProductResult> {
    return await this.productsService.sortProduct(input, option);
  }
}
