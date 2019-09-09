import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { SearchHistoryActions } from '../../../store/search-history/search-history.actions';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../core/user/user';
import { Product } from '../../../core/product/product';
import { filter, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { Page } from 'tns-core-modules/ui/page';
import { Analytics } from '../../../core/analytics/analytics';

@Component({
  selector: 'search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit, OnDestroy {
  @select(['authenticatedUser', 'user']) readonly user$: Observable<User>;
  @select(['searchHistory', 'items']) readonly searchHistory$: Observable<Array<Product>>;
  @select(['searchHistory', 'loading']) productLoading$: Observable<boolean>;
  @select(['searchHistory', 'error']) productError$: Observable<any>;
  public loading = true;
  public searchHistory: Array<Product> = [];
  public selectedIndexes = [];
  public menuOpenStatus = false;
  public menuId = -1;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private searchHistoryActions: SearchHistoryActions,
    private page: Page
  ) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.className = 'page-style';
    this.productLoading$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((loading: boolean) => {
      this.loading = loading;
    });
    this.searchHistory$.pipe(
      takeUntil(this.ngUnsubscribe),
      filter((data) => !!data)
    ).subscribe((searchHistory: any) => {
      this.searchHistory = searchHistory;
    });
    this.user$.pipe(
      filter((user: User) => !!user),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((user: User) => {
      this.loadHistory(user.id);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  toggleMenu(index: number) {
    if (this.menuId === -1 || this.menuId === index) {
      this.menuOpenStatus = !this.menuOpenStatus;
    }
    this.menuId = index;
  }

  getMessage(detail: Analytics, productName: string) {
    let msg = 'Searched for';
    msg = `${msg} ${productName} -`;
    msg = `${msg} ${this.dayLabels[moment(detail.date).day()]},`;
    msg = `${msg} ${moment(detail.date).format('DD MMMM YYYY')}`;
    msg = `${msg} at ${moment(detail.date).format('HH:mm:ss')}`;
    return msg;
  }

  @dispatch()
  loadHistory(userId) {
    return this.searchHistoryActions.loadSearchHistory(userId);
  }
}
