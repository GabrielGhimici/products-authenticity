import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ProductActions } from '../../store/product/product.actions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../../core/product/product';
import * as moment from 'moment';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  @select(['productData', 'loading']) productLoading$: Observable<boolean>;
  @select(['productData', 'product']) productData$: Observable<Product>;
  @select(['productData', 'error']) productError$: Observable<any>;
  public loading = true;
  public product: Product;
  public errorNotFound = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private productActions: ProductActions,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((map: ParamMap) => {
      if (map.has('identifier')) {
        this.loadProduct(map.get('identifier'));
      }
    });
    this.productLoading$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((loading: boolean) => {
      this.loading = loading;
    });
    this.productData$.pipe(
      takeUntil(this.ngUnsubscribe),
      filter((data) => !!data)
    ).subscribe((product: any) => {
      this.product = product;
    });
    this.productError$.pipe(
      takeUntil(this.ngUnsubscribe),
      filter((error) => !!error)
    ).subscribe((error: any) => {
      console.log(error);
      if (error.status === 404) {
        this.errorNotFound = true;
      }
    });
  }

  formatDate(date: Date) {
    return moment.utc(date).format('DD MMM YYYY HH:mm:ss');
  }

  formatValidity(quantity: number, unit: string) {
    if (unit === 'all') {
      return 'Forever';
    } else {
      const adjustedUnit = quantity === 1 ? unit : `${unit}s`;
      return `${quantity} ${adjustedUnit}`;
    }
   }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @dispatch()
  loadProduct(identifier: string) {
    return this.productActions.loadProduct(identifier);
  }
}