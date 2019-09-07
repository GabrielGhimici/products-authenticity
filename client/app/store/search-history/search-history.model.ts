import { Product } from '../../core/product/product';

export interface SearchHistoryState {
  loading: boolean;
  items: Array<Product>;
  error: any;
}
