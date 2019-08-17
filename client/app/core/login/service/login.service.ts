import { Injectable } from '@angular/core';
import { UserLoginData, UserSignUpData } from '../../../authentication/store/authentication.data';
import { LoginServiceCommon } from './login.service.common';

@Injectable()
export class LoginService {
  constructor(
    private loginCommon: LoginServiceCommon
  ) { }

  public signUp(bodyValue: UserSignUpData) {
    return this.loginCommon.signUp(bodyValue, 'api/user/sign-up');
  }

  public logIn(bodyValue: UserLoginData) {
    return this.loginCommon.logIn(bodyValue, 'auth/login');
  }

  public logOut() {
    return this.loginCommon.logOut('auth/logout');
  }

  public isLoggedIn() {
    return this.loginCommon.isLoggedIn('auth/token_info');
  }
}
