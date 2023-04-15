import { registerEnumType } from '@nestjs/graphql';

export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}
export enum RegisterType {
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
  NORMAL = 'Normal',
}

export enum SortProduct {
  ProductId = 'productId',
  Price = 'price',
  Discount = 'discount',
  Quantity = 'quantity',
}

registerEnumType(SortProduct, {
  name: 'SortProduct',
});
