import { Injectable } from '@angular/core';
import { SearchHistoryActions } from './search-history.actions';
import { SearchHistoryService } from '../../core/analytics/search-history/search-history.service.tns';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PayloadAction } from '../payload-action';
import { Product } from '../../core/product/product';
import { of } from 'rxjs';

@Injectable()
export class SearchHistoryEpic {
  constructor(
    private searchHistoryActions: SearchHistoryActions,
    private searchHistoryService: SearchHistoryService
  ) {}

  public createEpic() {
    return combineEpics(
      this.loadSearchHistory()
    );
  }

  private loadSearchHistory() {
    return action$ => action$.pipe(
      ofType(SearchHistoryActions.LOAD_SEARCH_HISTORY_STARTED),
      switchMap((action: PayloadAction) => {
        return this.searchHistoryService.getSearchHistory(action.payload.userId).pipe(
          map((data: Array<any>) => {
            const products = data.map(element => new Product(element));
            return this.searchHistoryActions.searchHistoryLoadSucceeded(products);
          }),
          catchError((error) => of(this.searchHistoryActions.searchHistoryLoadFailed(error)))
        );
      })
    );
  }

}
