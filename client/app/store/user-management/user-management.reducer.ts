import { UserManagementData } from './user-management.data';
import { PayloadAction } from '../payload-action';
import { UserManagementActions } from './user-management.actions';
import { User } from '../../core/user/user';

export const INITIAL_STATE: UserManagementData = {
  loading: true,
  addingUser: false,
  removingUser: false,
  settingRight:false,
  users: [],
  error: null
};

export function userManagementReducer(state: UserManagementData = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case UserManagementActions.LOAD_USERS_START: {
      return {
        ...state,
        ...{
          loading: true,
          error: null
        }
      };
    }
    case UserManagementActions.LOAD_USERS_SUCCEEDED: {
      return {
        ...state,
        ...{
          loading: false,
          users: action.payload.users
        }
      };
    }
    case UserManagementActions.LOAD_USERS_FAILED: {
      return {
        ...state,
        ...{
          loading: false,
          error: action.error
        }
      };
    }
    case UserManagementActions.ADDING_USER_START: {
      return {
        ...state,
        ...{
          addingUser: true,
          error: null
        }
      };
    }
    case UserManagementActions.ADDING_USER_SUCCEEDED: {
      const newUsers = state.users.slice().map((user: User) => {
        if (user.id === action.payload.userId) {
          user.parentEntityId = action.payload.entityId;
        }
        return user;
      });
      console.log(newUsers);
      return {
        ...state,
        ...{
          addingUser: false,
          users: newUsers
        }
      };
    }
    case UserManagementActions.ADDING_USER_FAILED: {
      return {
        ...state,
        ...{
          addingUser: false,
          error: action.error
        }
      };
    }
    case UserManagementActions.REMOVING_USER_START: {
      return {
        ...state,
        ...{
          removingUser: true,
          error: null
        }
      };
    }
    case UserManagementActions.REMOVING_USER_SUCCEEDED: {
      const newUsers = state.users.slice().map((user: User) => {
        if (user.id === action.payload.userId) {
          user.parentEntityId = null;
        }
        return user;
      });
      return {
        ...state,
        ...{
          removingUser: false,
          users: newUsers
        }
      };
    }
    case UserManagementActions.REMOVING_USER_FAILED: {
      return {
        ...state,
        ...{
          removingUser: false,
          error: action.error
        }
      };
    }
    case UserManagementActions.UPDATE_USER_ROLE_START: {
      return {
        ...state,
        ...{
          settingRight: true,
          error: null
        }
      };
    }
    case UserManagementActions.UPDATE_USER_ROLE_SUCCEEDED: {
      const newUsers = state.users.slice().map((user: User) => {
        if (user.id === action.payload.userId) {
          user.roleId =  action.payload.roleId;
        }
        return user;
      });
      return {
        ...state,
        ...{
          settingRight: false,
          users: newUsers
        }
      };
    }
    case UserManagementActions.UPDATE_USER_ROLE_FAILED: {
      return {
        ...state,
        ...{
          settingRight: false,
          error: action.error
        }
      };
    }
    default: {
      return state;
    }
  }
}
