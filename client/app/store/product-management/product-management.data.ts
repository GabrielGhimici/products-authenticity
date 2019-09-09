import { Product } from '../../core/product/product';

export interface ProductManagementData {
  loading: boolean;
  saving: boolean;
  product: Product;
  productList: Array<Product>;
  error: any;
}
