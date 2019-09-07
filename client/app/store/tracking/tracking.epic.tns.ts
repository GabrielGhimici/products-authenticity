import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TrackingActions } from './tracking.actions';
import { PayloadAction } from '../payload-action';
import { TrackingService } from '../../core/tracking/service/tracking.service.tns';
import { of } from 'rxjs';

@Injectable()
export class TrackingEpic {
  constructor(
    private trackingActions: TrackingActions,
    private trackingService: TrackingService
  ) {}

  public createEpic() {
    return combineEpics(
      this.track()
    );
  }

  private track() {
    return action$ => action$
      .pipe(
        ofType(TrackingActions.TRACK_START),
        switchMap((action: PayloadAction) => {
          return this.trackingService.track(action.payload.userId, action.payload.productId).pipe(
            map(() => this.trackingActions.trackSucceeded()),
            catchError((error) => of(this.trackingActions.trackFailed(error)))
          );
        })
      );
  }
}
