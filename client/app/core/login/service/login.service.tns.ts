import { Injectable } from '@angular/core';
import { HttpConfigService } from '../../http-config/http-config.service';
import { UserLoginData, UserSignUpData } from '../../../authentication/store/authentication.data';
import { LoginServiceCommon } from './login.service.common';

@Injectable()
export class LoginService {
  constructor(
    private loginCommon: LoginServiceCommon,
    private httpConfig: HttpConfigService
  ) { }

  public logIn(bodyValue: UserLoginData) {
    return this.loginCommon.logIn(bodyValue,`${this.httpConfig.getApiConfig()}/auth/login`, {include: 'token'});
  }

  public logOut() {
    const options = {
      headers: this.httpConfig.getAuthorizationConfig()
    };
    return this.loginCommon.logOut(`${this.httpConfig.getApiConfig()}/auth/logout`, options);
  }

  public isLoggedIn() {
    const options = {
      headers: this.httpConfig.getAuthorizationConfig()
    };
    return this.loginCommon.isLoggedIn(`${this.httpConfig.getApiConfig()}/auth/token_info`, options);
  }

  public signUp(bodyValue: UserSignUpData) {
    return this.loginCommon.signUp(bodyValue, `${this.httpConfig.getApiConfig()}/api/user/sign-up`);
  }
}
