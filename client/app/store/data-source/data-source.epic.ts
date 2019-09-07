import { Injectable } from '@angular/core';
import { DataSourceService } from '../../core/data-source/data-source.service';
import { DataSourceActions } from './data-source.actions';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DataSourceEpic {

  constructor(
    private service: DataSourceService,
    private actions: DataSourceActions
  ) {}

  public createEpic(type: string) {
    return combineEpics(
      this.createLoadDataSource(type)
    );
  }

  private createLoadDataSource(type) {
    return (action$) => {
      return action$
        .pipe(
          ofType(DataSourceActions.LOAD_STARTED),
          filter(({meta}) => meta === type),
          switchMap((act: any) => {
            return this.service.getAll(type, act.payload).pipe(
              map((data: Array<any>) => this.actions.loadSucceeded(type, data)),
              catchError(response => of(this.actions.loadFailed(type, response)))
            );
          })
        );
    };
  }
}
