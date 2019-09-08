import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { ProductManagementActions } from '../../../store/product-management/product-management.actions';
import { takeUntil } from 'rxjs/operators';
import { Entity } from '../../../core/entity/entity';
import { ProductType } from '../../../core/product/product-type';
import { User } from '../../../core/user/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, OnDestroy {
  @select(['productManagement', 'saving']) readonly saving$: Observable<boolean>;
  @select(['productManagement', 'error']) readonly savingError$: Observable<boolean>;
  @select(['dataSource', 'entity', 'items']) readonly entities$: Observable<Array<Entity>>;
  @select(['dataSource', 'productType', 'items']) readonly productTypes$: Observable<Array<ProductType>>;
  @select(['authenticatedUser', 'user']) user$: Observable<User>;
  public saving = false;
  public entities: Array<Entity> = [];
  public productTypes: Array<ProductType> = [];
  public user: User;
  public validityTerms = [{
    key: 'hour',
    label: 'Hour'
  }, {
    key: 'day',
    label: 'Day'
  }, {
    key: 'month',
    label: 'Month'
  }, {
    key: 'year',
    label: 'Year'
  }, {
    key: 'all',
    label: 'Forever'
  }];
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private productManagementActions: ProductManagementActions,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.saving$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((saving) => {
      this.saving = saving;
    });
    this.entities$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((entities) => {
      this.entities = entities;
    });
    this.productTypes$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((types) => {
      this.productTypes = types;
    });
    this.user$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((user) => {
      this.user = user;
    });
    this.savingError$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((data) => {
        if (data !== null) {
          this.matSnackBar.open(
            'There was an error in product save process.',
            '',
            {
              duration: 2000,
              horizontalPosition: 'right',
            }
          );
        }
    });
  }

  add(formValue, formValidity: boolean) {
    if (formValidity) {
      console.log(formValue, formValidity);
      if (formValue.validityTermUnit === 'all') {
        formValue.validityTermQuantity = null;
      }
      if (this.user.roleId !== 4) {
        formValue.parentEntity = this.user.parentEntityId;
      }
      console.log(formValue, formValidity);
      this.saveProduct(formValue);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @dispatch()
  saveProduct(product) {
    return this.productManagementActions.saveProduct(product);
  }
}
