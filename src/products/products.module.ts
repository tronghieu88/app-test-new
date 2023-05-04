import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './entities/product.entities';
import { LoggerModule } from 'src/logger/logger.module';
import { ProductSchema } from './schema/products.schema';
import { createKeyword, createSlug } from 'src/utils/string.utils';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          // schema.pre(/^find/, function () {
          schema.pre('find', function () {
            this.find({ isDeleted: { $ne: true } });
          });
          schema.pre('save', function () {
            this.slug = createSlug(this.productName);
            this.keyword = createKeyword(this.slug);
          });
          // schema.post('find', function (docs) {
          //   docs.forEach((doc) => {
          //     doc.slug = createSlug(doc.productName);
          //     doc.keyword = createKeyword(doc.slug);
          //   });
          // });
          return schema;
        },
      },
    ]),
    LoggerModule,
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
