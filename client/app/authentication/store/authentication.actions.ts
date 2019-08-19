import { Injectable } from '@angular/core';
import { UserLoginData, UserSignUpData } from './authentication.data';

@Injectable()
export class AuthenticationActions {
  public static readonly LOGIN_STARTED = '[AUTH_ACTIONS]LOGIN_STARTED';
  public static readonly LOGIN_SUCCEEDED = '[AUTH_ACTIONS]LOGIN_SUCCEEDED';
  public static readonly LOGIN_FAILED = '[AUTH_ACTIONS]LOGIN_FAILED';
  public static readonly SIGN_UP_STARTED = '[AUTH_ACTIONS]SIGN_UP_STARTED';
  public static readonly SIGN_UP_SUCCEEDED = '[AUTH_ACTIONS]SIGN_UP_SUCCEEDED';
  public static readonly SIGN_UP_FAILED = '[LOGIN_ACTIONS]SIGN_UP_FAILED';
  public static readonly LOG_OUT_STARTED = '[AUTH_ACTIONS]LOG_OUT_STARTED';
  public static readonly LOG_OUT_SUCCEEDED = '[AUTH_ACTIONS]LOG_OUT_SUCCEEDED';
  public static readonly LOG_OUT_FAILED = '[LOGIN_ACTIONS]LOG_OUT_FAILED';

  constructor() {}

  startLogin(userData: UserLoginData) {
    return {
      type: AuthenticationActions.LOGIN_STARTED,
      payload: userData
    };
  }

  loginSucceeded(loginData: boolean) {
    return {
      type: AuthenticationActions.LOGIN_SUCCEEDED,
      payload: loginData
    };
  }

  loginFailed(error: any) {
    return {
      type: AuthenticationActions.LOGIN_FAILED,
      error
    };
  }

  startSignUp(userData: UserSignUpData) {
    return {
      type: AuthenticationActions.SIGN_UP_STARTED,
      payload: userData
    };
  }

  signUpSucceeded(signedUpData: boolean) {
    return {
      type: AuthenticationActions.SIGN_UP_SUCCEEDED,
      payload: signedUpData
    };
  }

  signUpFailed(error: any) {
    return {
      type: AuthenticationActions.SIGN_UP_FAILED,
      error
    };
  }

  startLogOut() {
    return {
      type: AuthenticationActions.LOG_OUT_STARTED
    };
  }

  logOutSucceeded(loggedOut: boolean) {
    return {
      type: AuthenticationActions.LOG_OUT_SUCCEEDED,
      payload: loggedOut
    };
  }

  logOutFailed(error: any) {
    return {
      type: AuthenticationActions.LOG_OUT_FAILED,
      error
    };
  }

}
