import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../../core/product/product';
import { ProductManagementActions } from '../../../store/product-management/product-management.actions';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, OnDestroy {
  @select(['productManagement', 'product']) readonly product$: Observable<Product>;
  @select(['productManagement', 'loading']) readonly productManagementLoading$: Observable<boolean>;
  public product: Product = null;
  public productManagementLoading = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private productManagementActions: ProductManagementActions,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((map: ParamMap) => {
      if (map.has('id')) {
        const id = map.get('id');
        this.loadProduct(+id);
      }
    });
    this.product$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((prod) => {
      this.product = prod;
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
  loadProduct(id: number) {
    return this.productManagementActions.loadProduct(id);
  }

}
