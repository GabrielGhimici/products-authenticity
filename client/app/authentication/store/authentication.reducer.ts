import { PayloadAction } from '../../store/payload-action';
import { AuthenticationActions } from './authentication.actions';
import { AuthenticationData } from './authentication.data';

const INITIAL_STATE: AuthenticationData = {
  loggedIn: false,
  loggingIn : false,
  signingUp: false,
  error: null
};

export function authenticationReducer(state: AuthenticationData = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    case AuthenticationActions.LOGIN_STARTED : {
      return {
        ...state,
        ...{
          loggedIn: false,
          loggingIn: true,
          error: null
        },
      };
    }
    case AuthenticationActions.LOGIN_SUCCEEDED: {
      return {
        ...state,
        ...{
          loggedIn: action.payload,
          loggingIn: false,
          error: null,
        }
      };
    }
    case AuthenticationActions.LOGIN_FAILED: {
      return {
        ...state,
        ...{
          loggedIn: false,
          loggingIn: false,
          error: action.error,
        }
      };
    }
    case AuthenticationActions.SIGN_UP_STARTED : {
      return {
        ...state,
        ...{
          signingUp: true,
          error: null,
        }
      };
    }
    case AuthenticationActions.SIGN_UP_SUCCEEDED: {
      return {
        ...state,
        ...{
          signingUp: false,
          error: null,
        }
      };
    }
    case AuthenticationActions.SIGN_UP_FAILED: {
      return {
        ...state,
        ...{
          signingUp: false,
          error: action.error,
        }
      };
    }
    default: {
      return state;
    }
  }
}
