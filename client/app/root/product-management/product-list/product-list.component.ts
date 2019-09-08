import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../../core/product/product';
import { takeUntil } from 'rxjs/operators';
import { ProductManagementActions } from '../../../store/product-management/product-management.actions';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @select(['productManagement', 'productList']) readonly productList$: Observable<Array<Product>>;
  @select(['productManagement', 'loading']) readonly productManagementLoading$: Observable<boolean>;
  public productList: Array<Product> = [];
  public productManagementLoading = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private productManagementActions: ProductManagementActions
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.productList$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((list) => {
      this.productList = list;
    });
    this.productManagementLoading$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((loading) => {
      this.productManagementLoading = loading;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @dispatch()
  loadProducts() {
    return this.productManagementActions.loadProductList();
  }

}
