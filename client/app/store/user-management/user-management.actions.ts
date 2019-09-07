import { Injectable } from '@angular/core';
import { PayloadAction } from '../payload-action';
import { User } from '../../core/user/user';

@Injectable()
export class UserManagementActions {
  static readonly LOAD_USERS_START = '[USER_MANAGEMENT]LOAD_USERS_START';
  static readonly LOAD_USERS_SUCCEEDED = '[USER_MANAGEMENT]LOAD_USERS_SUCCEEDED';
  static readonly LOAD_USERS_FAILED = '[USER_MANAGEMENT]LOAD_USERS_FAILED';
  static readonly ADDING_USER_START = '[USER_MANAGEMENT]ADDING_USER_START';
  static readonly ADDING_USER_SUCCEEDED = '[USER_MANAGEMENT]ADDING_USER_SUCCEEDED';
  static readonly ADDING_USER_FAILED = '[USER_MANAGEMENT]ADDING_USER_FAILED';
  static readonly REMOVING_USER_START = '[USER_MANAGEMENT]REMOVING_USER_START';
  static readonly REMOVING_USER_SUCCEEDED = '[USER_MANAGEMENT]REMOVING_USER_SUCCEEDED';
  static readonly REMOVING_USER_FAILED = '[USER_MANAGEMENT]REMOVING_USER_FAILED';
  static readonly UPDATE_USER_ROLE_START = '[USER_MANAGEMENT]UPDATE_USER_ROLE_START';
  static readonly UPDATE_USER_ROLE_SUCCEEDED = '[USER_MANAGEMENT]UPDATE_USER_ROLE_SUCCEEDED';
  static readonly UPDATE_USER_ROLE_FAILED = '[USER_MANAGEMENT]UPDATE_USER_ROLE_FAILED';

  loadUsers(): PayloadAction {
    return {
      type: UserManagementActions.LOAD_USERS_START
    };
  }

  loadUsersSucceeded(users: Array<User>): PayloadAction {
    return {
      type: UserManagementActions.LOAD_USERS_SUCCEEDED,
      payload: {
        users
      }
    };
  }

  loadUsersFailed(error: any): PayloadAction {
    return {
      type: UserManagementActions.LOAD_USERS_FAILED,
      error
    };
  }

  addingUser(userId: number, entityId: number): PayloadAction {
    return {
      type: UserManagementActions.ADDING_USER_START,
      payload: {
        userId,
        entityId
      }
    };
  }

  addingUserSucceeded(userId: number, entityId: number): PayloadAction {
    return {
      type: UserManagementActions.ADDING_USER_SUCCEEDED,
      payload: {
        userId,
        entityId
      }
    };
  }

  addingUserFailed(error: any): PayloadAction {
    return {
      type: UserManagementActions.ADDING_USER_FAILED,
      error
    };
  }

  removingUser(userId: number): PayloadAction {
    return {
      type: UserManagementActions.REMOVING_USER_START,
      payload: {
        userId
      }
    };
  }

  removingUserSucceeded(userId: number): PayloadAction {
    return {
      type: UserManagementActions.REMOVING_USER_SUCCEEDED,
      payload: {
        userId
      }
    };
  }

  removingUserFailed(error: any): PayloadAction {
    return {
      type: UserManagementActions.REMOVING_USER_FAILED,
      error
    };
  }

  updateUserRole(userId: number, roleId: number): PayloadAction {
    return {
      type: UserManagementActions.UPDATE_USER_ROLE_START,
      payload: {
        userId,
        roleId
      }
    };
  }

  updateUserRoleSucceeded(userId: number, roleId: number): PayloadAction {
    return {
      type: UserManagementActions.UPDATE_USER_ROLE_SUCCEEDED,
      payload: {
        userId,
        roleId
      }
    };
  }

  updateUserRoleFailed(error: any): PayloadAction {
    return {
      type: UserManagementActions.UPDATE_USER_ROLE_FAILED,
      error
    };
  }

}
