import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../../core/product/product';
import { takeUntil } from 'rxjs/operators';
import { ProductManagementActions } from '../../../store/product-management/product-management.actions';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

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
  public displayedColumns: string[] = ['id', 'name', 'type', 'owner', 'productionDate'];
  public dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  constructor(
    private productManagementActions: ProductManagementActions
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.productList$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((list) => {
      this.productList = list;
      this.dataSource.data = list;
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

  applyFilter(filterValue: string) {
    this.dataSource.data = this.productList.filter((product: Product) => {
      const filter = filterValue.trim().toLowerCase();
      return product.id.toString().includes(filter) ||
             product.name.toLowerCase().includes(filter) ||
             product.productType.name.toLowerCase().includes(filter) ||
             product.owner.name.toLowerCase().includes(filter);
    });
  }

  formatDate(date: Date) {
    return moment.utc(date).format('DD MMM YYYY HH:mm:ss');
  }

  @dispatch()
  loadProducts() {
    return this.productManagementActions.loadProductList();
  }

}
