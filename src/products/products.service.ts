import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductResult } from './entities/product.entities';

import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';
import { ProductInput } from './dto/product.dto';
import { throwIfExisted, throwIfNotExists } from 'src/utils/model.utils';

type ProductModelType = Model<Product>;

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: ProductModelType,
    private loggerService: LoggerService,
  ) {
    this.loggerService.setContext('ProductService');
  }

  async create(productInput: ProductInput): Promise<Product> {
    // const productExist = await this.productModel.findOne({
    //   productId: productInput.productId,
    // });
    // throwIfExisted(productExist, 'Sản phẩm đã tồn tại!');
    return await this.productModel.create(productInput);
  }

  async findOne(productName: string): Promise<Product | null> {
    const product = await this.productModel.findOne({
      productName: productName,
    });
    throwIfNotExists(product, 'Không tìm thấy sản phẩm!');
    return product;
  }

  async findWithName(input: string): Promise<ProductResult> {
    const results = await this.productModel.find({
      productName: { $regex: input, $options: 'i' },
    });
    const totalCount = results.length;
    return { results, totalCount };
  }

  async getAllProduct(): Promise<ProductResult> {
    const results = await this.productModel.find();
    const totalCount = results.length;
    return { results, totalCount };
  }

  async deleteOne(productInput: ProductInput): Promise<Boolean> {
    const productUpdate = await this.productModel.findOneAndUpdate(
      { productId: productInput.productId },
      { $set: { isDeleted: true } },
    );
    return productUpdate ? true : false;
  }

  async updateOne(
    productID: string,
    productInput: ProductInput,
  ): Promise<Boolean> {
    const { productId, ...productUpdate } = productInput;
    const productNew = await this.productModel.findOneAndUpdate(
      { productId: productID },
      productUpdate,
      { new: true },
    );
    return productNew ? true : false;
  }

  async sortProduct(input, option: number): Promise<ProductResult> {
    const sortBy = input;
    const sortOrder: number = option;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 1 ? 1 : -1;

    const query = await this.productModel.find({}).sort(sortOptions);

    // let query: any;

    // query = this.productModel.find().sort(sortQuery);
    const results = query;
    const totalCount = results.length;
    // console.log(results);
    return { results, totalCount };
  }

  // async getProductTest(): Promise<ProductResult> {
  //   const test = await this.productModel.aggregate([
  //     {
  //       $group: {
  //         _id: '$quantity',
  //         products: { $push: '$$ROOT' },
  //       },
  //     },
  //   ]);
  //   const results = test;
  //   const totalCount = results.length;
  //   return { results, totalCount };
  // }
  async getProductTest(): Promise<ProductResult> {
    const test = await this.productModel.find({
      categoryId: '643bc5a26ddcff1e95a3604a',
    });
    const results = test;
    const totalCount = results.length;
    return { results, totalCount };
  }
}
