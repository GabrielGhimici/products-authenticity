import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../../core/user/user';
import { of } from 'rxjs';
import { UserService } from '../../core/user/service/user.service';
import { UserManagementActions } from './user-management.actions';
import { PayloadAction } from '../payload-action';

@Injectable()
export class UserManagementEpic {
  constructor(
    private userService: UserService,
    private userManagementActions: UserManagementActions
  ) {}

  public createEpic() {
    return combineEpics(
      this.loadUsers(),
      this.addUserToOrg(),
      this.removeUserFormOrg(),
      this.changeRole()
    );
  }

  private loadUsers() {
    return action$ => action$
      .pipe(
        ofType(UserManagementActions.LOAD_USERS_START),
        switchMap(() => {
          return this.userService.getUsers().pipe(
            map((data: any) => {
              const users = data.map((user: any) => new User(user));
              return this.userManagementActions.loadUsersSucceeded(users);
            }),
            catchError(data => of(this.userManagementActions.loadUsersFailed(data)))
          );
        })
      );
  }

  private addUserToOrg() {
    return action$ => action$
      .pipe(
        ofType(UserManagementActions.ADDING_USER_START),
        switchMap((action: PayloadAction) => {
          return this.userService.addUserToEntity(action.payload.userId, action.payload.entityId).pipe(
            map(() => {
              return this.userManagementActions.addingUserSucceeded(action.payload.userId, action.payload.entityId);
            }),
            catchError(data => of(this.userManagementActions.addingUserFailed(data)))
          );
        })
      );
  }

  private removeUserFormOrg() {
    return action$ => action$
      .pipe(
        ofType(UserManagementActions.REMOVING_USER_START),
        switchMap((action: PayloadAction) => {
          return this.userService.removeUserFromEntity(action.payload.userId).pipe(
            map(() => {
              return this.userManagementActions.removingUserSucceeded(action.payload.userId);
            }),
            catchError(data => of(this.userManagementActions.removingUserFailed(data)))
          );
        })
      );
  }

  private changeRole() {
    return action$ => action$
      .pipe(
        ofType(UserManagementActions.UPDATE_USER_ROLE_START),
        switchMap((action: PayloadAction) => {
          return this.userService.updateUserRole(action.payload.userId, action.payload.roleId).pipe(
            map(() => {
              return this.userManagementActions.updateUserRoleSucceeded(action.payload.userId, action.payload.roleId);
            }),
            catchError(data => of(this.userManagementActions.updateUserRoleFailed(data)))
          );
        })
      );
  }
}
