import { AuthenticationData } from '../authentication/store/authentication.data';
import { UserData } from './user/user.data';
import { ProductData } from './product/product.data';
import { SearchHistoryState } from './search-history/search-history.model';

export interface AppState {
  router?: any;
  authentication?: AuthenticationData;
  authenticatedUser?: UserData;
  productData?: ProductData;
  searchHistory?: SearchHistoryState;
}
