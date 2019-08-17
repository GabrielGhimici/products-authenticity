import { Injectable } from '@angular/core';
import { UserLoginData, UserSignUpData } from '../../../authentication/store/authentication.data';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginServiceCommon {
  constructor(
    private http: HttpClient
  ) {}

  public signUp(bodyValue: UserSignUpData, url: string, options?: {[key: string]: any}) {
    return this.http.post(url, bodyValue, options ? options : {});
  }

  public logIn(bodyValue: UserLoginData, url: string, params?: {[key: string]: string}) {
    if (params) {
      return this.http.post(url, bodyValue, {params});
    }
    return this.http.post(url, bodyValue);
  }

  public logOut(url: string) {
    return this.http.post(url, {});
  }

  public isLoggedIn(url: string, options?: {[key: string]: any}) {
    return this.http.get(url, options ? options : {}).pipe(
      map((_: {valid: boolean}) => {
        return _.valid === true;
      })
    );
  }
}
