import { Product } from '../../core/product/product';

export interface ProductData {
  loading: boolean;
  product: Product;
  error: any;
}
