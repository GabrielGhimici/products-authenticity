import { Injectable } from '@angular/core';
import { PayloadAction } from '../payload-action';
import { Product } from '../../core/product/product';

@Injectable()
export class ProductActions {
  public static readonly LOAD_PRODUCT_START = '[PRODUCT_ACTIONS]LOAD_PRODUCT_START';
  public static readonly LOAD_PRODUCT_SUCCEEDED = '[PRODUCT_ACTIONS]LOAD_PRODUCT_SUCCEEDED';
  public static readonly LOAD_PRODUCT_FAILED = '[PRODUCT_ACTIONS]LOAD_PRODUCT_FAILED';

  loadProduct(identifier: string): PayloadAction {
    return {
      type: ProductActions.LOAD_PRODUCT_START,
      payload: {
        identifier
      }
    };
  }

  loadProductSucceeded(product: Product): PayloadAction {
    return {
      type: ProductActions.LOAD_PRODUCT_SUCCEEDED,
      payload: {
        product
      }
    };
  }

  loadProductFailed(error: any): PayloadAction {
    return {
      type: ProductActions.LOAD_PRODUCT_FAILED,
      error
    };
  }
}
