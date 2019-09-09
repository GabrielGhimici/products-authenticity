import { Injectable } from '@angular/core';
import { ProductService } from '../../core/product/service/product.service';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PayloadAction } from '../payload-action';
import { Product } from '../../core/product/product';
import { of } from 'rxjs';
import { ProductManagementActions } from './product-management.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProductManagementEpic {
  constructor(
    private productManagementActions: ProductManagementActions,
    private productService: ProductService,
    private router: Router
  ) {}

  public createEpic() {
    return combineEpics(
      this.loadProduct(),
      this.saveProduct(),
      this.redirect(),
      this.loadProductList()
    );
  }

  private loadProduct() {
    return (action$) => action$
      .pipe(
        ofType(ProductManagementActions.LOAD_PRODUCT_START),
        switchMap((action: PayloadAction) => {
          return this.productService.getProductById(action.payload.id).pipe(
            map((result: any) => {
              const product = new Product(result);
              return this.productManagementActions.loadProductSucceeded(product);
            }),
            catchError((error: any) => of(this.productManagementActions.loadProductFailed(error)))
          );
        })
      );
  }

  private saveProduct() {
    return (action$) => action$
      .pipe(
        ofType(ProductManagementActions.SAVE_PRODUCT_START),
        switchMap((action: PayloadAction) => {
          return this.productService.saveProduct(action.payload.product).pipe(
            map((result: any) => {
              const product = new Product(result);
              return this.productManagementActions.saveProductSucceeded(product);
            }),
            catchError((error: any) => of(this.productManagementActions.saveProductFailed(error)))
          );
        })
      );
  }

  private loadProductList() {
    return (action$) => action$
      .pipe(
        ofType(ProductManagementActions.LOAD_PRODUCT_LIST_START),
        switchMap(() => {
          return this.productService.getProductListForOrganization().pipe(
            map((result: Array<any>) => {
              const product = result.map(el => new Product(el));
              return this.productManagementActions.loadProductListSucceeded(product);
            }),
            catchError((error: any) => of(this.productManagementActions.loadProductListFailed(error)))
          );
        })
      );
  }

  private redirect() {
    return (action$) => action$
      .pipe(
        ofType(ProductManagementActions.SAVE_PRODUCT_SUCCEEDED),
        map(() => {
          this.router.navigate(['main', 'product-list']);
          return {type: 'REDIRECT_SUCCESS'};
        }),
        catchError(() => of({type: 'REDIRECT_ERROR'}))
      );
  }
}
