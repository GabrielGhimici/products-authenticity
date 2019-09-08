import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../../core/product/product';
import { ProductManagementActions } from '../../../store/product-management/product-management.actions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { area, column } from './view-product.component.chart';
import * as Highcharts from 'highcharts';
import { sortBy } from 'lodash';

@Component({
  selector: 'view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit, OnDestroy {
  @select(['productManagement', 'product']) readonly product$: Observable<Product>;
  @select(['productManagement', 'loading']) readonly productManagementLoading$: Observable<boolean>;
  @select(['productManagement', 'error']) readonly productError$: Observable<boolean>;
  public product: Product = null;
  public productManagementLoading = true;
  public errorNotFound = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('areaChart', {static: false}) areaChartContainer;
  @ViewChild('detailedChart', {static: false}) detailedChartContainer;
  constructor(
    private productManagementActions: ProductManagementActions,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((map: ParamMap) => {
      if (map.has('id') ) {
        this.loadProduct(+map.get('id'));
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

    this.productError$.pipe(
      takeUntil(this.ngUnsubscribe),
      filter((error) => !!error)
    ).subscribe((error: any) => {
      if (error.status === 404) {
        this.errorNotFound = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  calculateArea() {
    const simpleChartData = [];
    const simpleChartLabels = [];
    if (this.product) {
      const map = this.product.analytics.map((el) => {
        return moment(el.date).format('DD-MMM-YYYY');
      }).reduce((acc, el) => {
        if (!acc[el]) {
          acc[el] = {
            date: el,
            value: 0
          };
        }
        acc[el].value++;
        return acc;
      }, {});
      sortBy(Object.keys(map).map((k) => map[k]), 'date').forEach((el) => {
        simpleChartData.push(el.value);
        simpleChartLabels.push(el.date);
      });
    }
    return {
      simpleChartData,
      simpleChartLabels
    };
  }

  calculateColumn() {
    const columnChartData = [];
    const columnChartAdditionalData = [];
    const columnChartLabels = [];
    if (this.product) {
      const map = this.product.analytics.map((el) => {
        return {
          date: moment(el.date).format('DD-MMM-YYYY'),
          platform: el.platform
        };
      }).reduce((acc, el) => {
        if (!acc[el.date]) {
          acc[el.date] = {
            date: el.date,
            web: 0,
            mobile: 0
          };
        }
        if (el.platform === 'web') {
          acc[el.date].web++;
        } else {
          acc[el.date].mobile++;
        }
        return acc;
      }, {});
      sortBy(Object.keys(map).map((k) => map[k]), 'date').forEach((el) => {
        columnChartData.push(el.web);
        columnChartAdditionalData.push(el.mobile);
        columnChartLabels.push(el.date);
      });
    }
    return {
      columnChartData,
      columnChartAdditionalData,
      columnChartLabels
    };
  }

  changedTab(event) {
    const areaChart = this.calculateArea();
    const columnChart = this.calculateColumn();
    if (event === 1) {
      setTimeout(() => {
        if (this.areaChartContainer) {
          Highcharts.chart(
            this.areaChartContainer.nativeElement,
            area(areaChart.simpleChartData, areaChart.simpleChartLabels)
          );
        }
        if (this.detailedChartContainer) {
          Highcharts.chart(
            this.detailedChartContainer.nativeElement,
            column(columnChart.columnChartData, columnChart.columnChartAdditionalData, columnChart.columnChartLabels)
          );
        }
      }, 0);
    }
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

  @dispatch()
  loadProduct(id: number) {
    return this.productManagementActions.loadProduct(id);
  }
}
