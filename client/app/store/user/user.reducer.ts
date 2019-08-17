import { UserData } from './user.data';
import { PayloadAction } from '../payload-action';
import { UserActions } from './user.actions';

const INITIAL_STATE: UserData = {
  loading: false,
  user: null,
  error: null
};

export function userReducer(state: UserData = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case UserActions.USER_LOAD_START: {
      return {
        ...state,
        ...{
          loading: true
        }
      };
    }
    case UserActions.USER_LOAD_SUCCEEDED: {
      return {
        ...state,
        ...{
          loading: false,
          user: action.payload
        }
      };
    }
    case UserActions.USER_LOAD_FAILED: {
      return {
        ...state,
        ...{
          loading: false,
          error: action.error
        }
      };
    }
    default:
      return state;
  }

}
