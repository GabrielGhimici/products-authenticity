import { Injectable } from '@angular/core';
import { ProductActions } from './product.actions';
import { ProductService } from '../../core/product/service/product.service.tns';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { PayloadAction } from '../payload-action';
import { Product } from '../../core/product/product';
import { of } from 'rxjs';

@Injectable()
export class ProductEpic {
  constructor(
    private productActions: ProductActions,
    private productService: ProductService
  ) {}

  public createEpic() {
    return combineEpics(
      this.loadProduct()
    );
  }

  private loadProduct() {
    return action$ => action$
      .pipe(
        ofType(ProductActions.LOAD_PRODUCT_START),
        switchMap((action: PayloadAction) => {
          return this.productService.getProductByIdentifier(action.payload.identifier).pipe(
            delay(1500),
            map((result: any) => {
              const product = new Product(result);
              return this.productActions.loadProductSucceeded(product);
            }),
            catchError((error: any) => of(this.productActions.loadProductFailed(error)))
          );
        })
      );
  }
}
