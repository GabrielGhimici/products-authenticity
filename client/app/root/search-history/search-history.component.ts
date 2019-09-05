import { Component, OnDestroy, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { SearchHistoryActions } from '../../store/search-history/search-history.actions';
import { Observable, Subject } from 'rxjs';
import { User } from '../../core/user/user';
import { Product } from '../../core/product/product';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit, OnDestroy {
  @select(['authenticatedUser', 'user']) readonly user$: Observable<User>;
  @select(['searchHistory', 'items']) readonly searchHistory$: Observable<Product>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private searchHistoryActions: SearchHistoryActions
  ) { }

  ngOnInit() {
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

  @dispatch()
  loadHistory(userId) {
    return this.searchHistoryActions.loadSearchHistory(userId);
  }
}
