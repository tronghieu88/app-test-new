export interface IProduct extends IEntity {
  // id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  urlImage?: string[];
  discount?: number;
  description: string;
  colors?: string[];
  rating: number;
}
