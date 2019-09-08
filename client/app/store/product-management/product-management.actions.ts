import { Injectable } from '@angular/core';
import { PayloadAction } from '../payload-action';
import { Product } from '../../core/product/product';

@Injectable()
export class ProductManagementActions {
  public static readonly LOAD_PRODUCT_START = '[PRODUCT_MANAGEMENT]LOAD_PRODUCT_START';
  public static readonly LOAD_PRODUCT_SUCCEEDED = '[PRODUCT_MANAGEMENT]LOAD_PRODUCT_SUCCEEDED';
  public static readonly LOAD_PRODUCT_FAILED = '[PRODUCT_MANAGEMENT]LOAD_PRODUCT_FAILED';
  public static readonly LOAD_PRODUCT_LIST_START = '[PRODUCT_MANAGEMENT]LOAD_PRODUCT_LIST_START';
  public static readonly LOAD_PRODUCT_LIST_SUCCEEDED = '[PRODUCT_MANAGEMENT]LOAD_PRODUCT_LIST_SUCCEEDED';
  public static readonly LOAD_PRODUCT_LIST_FAILED = '[PRODUCT_MANAGEMENT]LOAD_PRODUCT_LIST_FAILED';
  public static readonly SAVE_PRODUCT_START = '[PRODUCT_MANAGEMENT]SAVE_PRODUCT_START';
  public static readonly SAVE_PRODUCT_SUCCEEDED = '[PRODUCT_MANAGEMENT]SAVE_PRODUCT_SUCCEEDED';
  public static readonly SAVE_PRODUCT_FAILED = '[PRODUCT_MANAGEMENT]SAVE_PRODUCT_FAILED';

  loadProduct(id: number): PayloadAction {
    return {
      type: ProductManagementActions.LOAD_PRODUCT_START,
      payload: {
        id
      }
    };
  }

  loadProductSucceeded(product: Product): PayloadAction {
    return {
      type: ProductManagementActions.LOAD_PRODUCT_SUCCEEDED,
      payload: {
        product
      }
    };
  }

  loadProductFailed(error: any): PayloadAction {
    return {
      type: ProductManagementActions.LOAD_PRODUCT_FAILED,
      error
    };
  }

  saveProduct(product): PayloadAction {
    return {
      type: ProductManagementActions.SAVE_PRODUCT_START,
      payload: {
        product
      }
    };
  }

  saveProductSucceeded(product: Product): PayloadAction {
    return {
      type: ProductManagementActions.SAVE_PRODUCT_SUCCEEDED,
      payload: {
        product
      }
    };
  }

  saveProductFailed(error: any): PayloadAction {
    return {
      type: ProductManagementActions.SAVE_PRODUCT_FAILED,
      error
    };
  }

  loadProductList(): PayloadAction {
    return {
      type: ProductManagementActions.LOAD_PRODUCT_LIST_START
    };
  }

  loadProductListSucceeded(products: Array<Product>): PayloadAction {
    return {
      type: ProductManagementActions.LOAD_PRODUCT_LIST_SUCCEEDED,
      payload: {
        products
      }
    };
  }

  loadProductListFailed(error: any): PayloadAction {
    return {
      type: ProductManagementActions.LOAD_PRODUCT_LIST_FAILED,
      error
    };
  }
}
