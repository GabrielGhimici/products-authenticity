import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import { authenticationReducer } from '../authentication/store/authentication.reducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  authentication: authenticationReducer
});
