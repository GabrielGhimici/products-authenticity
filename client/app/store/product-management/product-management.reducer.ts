import { ProductManagementData } from './product-management.data';
import { PayloadAction } from '../payload-action';
import { ProductManagementActions } from './product-management.actions';

const INITIAL_STATE: ProductManagementData = {
  loading: true,
  saving: false,
  product: null,
  productList: [],
  error: null
};

export function productManagementReducer(state: ProductManagementData = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case ProductManagementActions.LOAD_PRODUCT_START:
    case ProductManagementActions.LOAD_PRODUCT_LIST_START: {
      return {
        ...state,
        ...{
          loading: true,
          error: null
        }
      };
    }
    case ProductManagementActions.SAVE_PRODUCT_START: {
      return {
        ...state,
        ...{
          saving: true,
          error: null
        }
      };
    }
    case ProductManagementActions.LOAD_PRODUCT_SUCCEEDED: {
      return {
        ...state,
        ...{
          loading: false,
          product: action.payload.product
        }
      };
    }
    case ProductManagementActions.LOAD_PRODUCT_LIST_SUCCEEDED: {
      return {
        ...state,
        ...{
          loading: false,
          productList: action.payload.products
        }
      };
    }
    case ProductManagementActions.SAVE_PRODUCT_SUCCEEDED: {
      return {
        ...state,
        ...{
          saving: false,
          product: action.payload.product
        }
      };
    }
    case ProductManagementActions.SAVE_PRODUCT_FAILED: {
      return {
        ...state,
        ...{
          saving: false,
          error: action.error
        }
      };
    }
    case ProductManagementActions.LOAD_PRODUCT_LIST_FAILED:
    case ProductManagementActions.LOAD_PRODUCT_FAILED: {
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
