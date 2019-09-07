import { Product } from '../product/product';
import { User } from '../user/user';

export class Analytics {
  id: number;
  date: Date;
  userId: number;
  productId: number;
  platform: string;
  product: Product;
  user: User;
  constructor(source: { [key: string]: any } = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.date = source.hasOwnProperty('date') ? source.date : null;
    this.userId = source.hasOwnProperty('userId') ? source.userId : null;
    this.productId = source.hasOwnProperty('productId') ? source.productId : null;
    this.platform = source.hasOwnProperty('platform') ? source.platform : null;
    this.product = source.hasOwnProperty('product') ? new Product(source.product) : null;
    this.user = source.hasOwnProperty('user') ? new User(source.user) : null;
  }
}
