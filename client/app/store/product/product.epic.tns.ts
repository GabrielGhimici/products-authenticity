import { Injectable } from '@angular/core';
import { ProductActions } from './product.actions';
import { ProductService } from '../../core/product/service/product.service.tns';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, switchMap } from 'rxjs/operators';
import { PayloadAction } from '../payload-action';
import { Product } from '../../core/product/product';
import { from, of } from 'rxjs';
import { TrackingActions } from '../tracking/tracking.actions';

@Injectable()
export class ProductEpic {
  constructor(
    private productActions: ProductActions,
    private trackingActions: TrackingActions,
    private productService: ProductService
  ) {}

  public createEpic() {
    return combineEpics(
      this.loadProduct()
    );
  }

  private loadProduct() {
    return (action$, store) => action$
      .pipe(
        ofType(ProductActions.LOAD_PRODUCT_START),
        switchMap((action: PayloadAction) => {
          return this.productService.getProductByIdentifier(action.payload.identifier).pipe(
            switchMap((result: any) => {
              const product = new Product(result);
              const currentState = store.value;
              let userId = -1;
              if (currentState.hasOwnProperty('authenticatedUser') &&
                currentState.authenticatedUser.hasOwnProperty('user')) {
                userId = currentState.authenticatedUser.user.id;
              }
              return from([
                this.productActions.loadProductSucceeded(product),
                this.trackingActions.track(userId, product.id)
              ]);
            }),
            catchError((error: any) => of(this.productActions.loadProductFailed(error)))
          );
        })
      );
  }
}
