import { ProductData } from './product.data';
import { PayloadAction } from '../payload-action';
import { ProductActions } from './product.actions';

const INITIAL_STATE: ProductData = {
  loading: true,
  product: null,
  error: null
};

export function productReducer(state: ProductData = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case ProductActions.LOAD_PRODUCT_START: {
      return {
        ...state,
        ...{
          loading: true,
          error: null
        }
      };
    }
    case ProductActions.LOAD_PRODUCT_SUCCEEDED: {
      return {
        ...state,
        ...{
          loading: false,
          product: action.payload.product
        }
      };
    }
    case ProductActions.LOAD_PRODUCT_FAILED: {
      return {
        ...state,
        ...{
          loading: false,
          error: action.error
        }
      };
    }
    default:
      return state;
  }
}
