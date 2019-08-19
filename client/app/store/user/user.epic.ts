import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable';
import { UserActions } from './user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../core/user/service/user.service';
import { of } from 'rxjs';
import { User } from '../../core/user/user';

@Injectable()
export class UserEpic {
  constructor(
    private userActions: UserActions,
    private userService: UserService
  ) {}

  public createEpic() {
    return combineEpics(
      this.loadUser()
    );
  }

  private loadUser() {
    return action$ => action$
      .pipe(
        ofType(UserActions.USER_LOAD_START),
        switchMap(() => {
          return this.userService.getUser().pipe(
            map((data: any) => {
              const user = new User(data);
              return this.userActions.loadUserSucceeded(user);
            }),
            catchError(data => of(this.userActions.loadUserFailed(data)))
          );
        })
      );
  }
}
