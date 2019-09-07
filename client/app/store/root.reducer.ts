import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import { authenticationReducer } from '../authentication/store/authentication.reducer';
import { userReducer } from './user/user.reducer';
import { productReducer } from './product/product.reducer';
import { searchHistoryReducer } from './search-history/search-history.reducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  authentication: authenticationReducer,
  authenticatedUser: userReducer,
  productData: productReducer,
  searchHistory: searchHistoryReducer
});
