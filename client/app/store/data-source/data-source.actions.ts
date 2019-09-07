import { Injectable } from '@angular/core';
import { PayloadAction } from '../payload-action';

@Injectable()
export class DataSourceActions {
  static readonly LOAD_STARTED = '[DATA_SOURCE]LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[DATA_SOURCE]LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[DATA_SOURCE]LOAD_FAILED';

  loadData(type: string,  params?: any): PayloadAction {
    return {
      type: DataSourceActions.LOAD_STARTED,
      meta: type,
      payload: params || {}
    };
  }

  loadSucceeded(type: string, payload: Array<any>): PayloadAction  {
    return {
      type: DataSourceActions.LOAD_SUCCEEDED,
      meta: type,
      payload,
    };
  }

  loadFailed(type: string, error): PayloadAction  {
    return {
      type: DataSourceActions.LOAD_FAILED,
      meta: type,
      error,
    };
  }

}
