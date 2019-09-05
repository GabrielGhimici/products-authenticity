import { Injectable } from '@angular/core';
import { PayloadAction } from '../payload-action';
import { Product } from '../../core/product/product';

@Injectable()
export class SearchHistoryActions {
  public static readonly LOAD_SEARCH_HISTORY_STARTED = '[SEARCH_HISTORY]LOAD_STARTED';
  public static readonly LOAD_SEARCH_HISTORY_SUCCEEDED = '[SEARCH_HISTORY]LOAD_SUCCEEDED';
  public static readonly LOAD_SEARCH_HISTORY_FAILED = '[SEARCH_HISTORY]LOAD_FAILED';

  public loadSearchHistory(userId: number): PayloadAction {
    return {
      type: SearchHistoryActions.LOAD_SEARCH_HISTORY_STARTED,
      payload: {
        userId
      }
    };
  }

  public searchHistoryLoadSucceeded(data: Array<Product>): PayloadAction {
    return {
      type: SearchHistoryActions.LOAD_SEARCH_HISTORY_SUCCEEDED,
      payload: {
        data
      }
    };
  }

  public searchHistoryLoadFailed(error): PayloadAction {
    return {
      type: SearchHistoryActions.LOAD_SEARCH_HISTORY_FAILED,
      error
    };
  }
}
