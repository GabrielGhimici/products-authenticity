import { PayloadAction } from '../../store/payload-action';
import { AuthenticationActions } from './authentication.actions';
import { AuthenticationData } from './authentication.data';

const INITIAL_STATE: AuthenticationData = {
  loggedOut: false,
  loggedIn: false,
  signedUp: false,
  loggingIn : false,
  signingUp: false,
  loggingOut: false,
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
          signedUp: false,
          signingUp: true,
          error: null,
        }
      };
    }
    case AuthenticationActions.SIGN_UP_SUCCEEDED: {
      return {
        ...state,
        ...{
          signedUp: action.payload,
          signingUp: false,
          error: null,
        }
      };
    }
    case AuthenticationActions.SIGN_UP_FAILED: {
      return {
        ...state,
        ...{
          signedUp: false,
          signingUp: false,
          error: action.error,
        }
      };
    }
    case AuthenticationActions.LOG_OUT_STARTED : {
      return {
        ...state,
        ...{
          loggedOut: false,
          loggingOut: true,
          error: null,
        }
      };
    }
    case AuthenticationActions.LOG_OUT_SUCCEEDED: {
      return {
        ...state,
        ...{
          loggedOut: action.payload,
          loggingOut: true,
          error: null,
        }
      };
    }
    case AuthenticationActions.LOG_OUT_FAILED: {
      return {
        ...state,
        ...{
          loggedOut: false,
          loggingOut: true,
          error: action.error,
        }
      };
    }
    default: {
      return state;
    }
  }
}
