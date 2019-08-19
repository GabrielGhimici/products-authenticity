import { Injectable } from '@angular/core';
import { User } from '../../core/user/user';

@Injectable()
export class UserActions {
  public static readonly USER_LOAD_START = '[USER_ACTIONS]LOAD_START';
  public static readonly USER_LOAD_SUCCEEDED = '[USER_ACTIONS]LOAD_SUCCEEDED';
  public static readonly USER_LOAD_FAILED = '[USER_ACTIONS]LOAD_FAILED';

  loadUser() {
    return {
      type: UserActions.USER_LOAD_START
    };
  }

  loadUserSucceeded(user: User) {
    return {
      type: UserActions.USER_LOAD_SUCCEEDED,
      payload: user
    };
  }

  loadUserFailed(err: any) {
    return {
      type: UserActions.USER_LOAD_FAILED,
      error: err
    };
  }
}
