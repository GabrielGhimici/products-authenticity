import { Injectable } from '@angular/core';
import { PayloadAction } from '../payload-action';

@Injectable()
export class TrackingActions {
  public static readonly TRACK_START = '[TRACKING]TRACK_START';
  public static readonly TRACK_SUCCEEDED = '[TRACKING]TRACK_SUCCEEDED';
  public static readonly TRACK_FAILED = '[TRACKING]TRACK_FAILED';

  public track(userId: number, productId: number): PayloadAction {
    return {
      type: TrackingActions.TRACK_START,
      payload: {
        userId,
        productId
      }
    };
  }

  public trackSucceeded(): PayloadAction {
    return {
      type: TrackingActions.TRACK_SUCCEEDED
    };
  }

  public trackFailed(error): PayloadAction {
    return {
      type: TrackingActions.TRACK_FAILED,
      error
    };
  }
}
