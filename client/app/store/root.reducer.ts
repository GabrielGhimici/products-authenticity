import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import { authenticationReducer } from '../authentication/store/authentication.reducer';
import { userReducer } from './user/user.reducer';
import { productReducer } from './product/product.reducer';
import { searchHistoryReducer } from './search-history/search-history.reducer';
import { userManagementReducer } from './user-management/user-management.reducer';
import { dataSourceReducer } from './data-source/data-source.reducer';
import { productManagementReducer } from './product-management/product-management.reducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  authentication: authenticationReducer,
  authenticatedUser: userReducer,
  productData: productReducer,
  searchHistory: searchHistoryReducer,
  userManagement: userManagementReducer,
  dataSource: dataSourceReducer,
  productManagement: productManagementReducer
});
