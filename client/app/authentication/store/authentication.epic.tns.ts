import { Injectable } from '@angular/core';
import { LoginService } from '../../core/login/service/login.service.tns';
import { AuthenticationActions } from './authentication.actions';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PayloadAction } from '../../store/payload-action';
import { of } from 'rxjs';
import { setString } from 'tns-core-modules/application-settings';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEpic {

  constructor(private loginService: LoginService,
              private router: Router,
              private authenticationActions: AuthenticationActions) {}

  public createEpic() {
    return combineEpics(
      this.loginEpic(),
      this.signUpEpic(),
      this.logOutEpic(),
      this.redirectToLogin()
    );
  }

  private signUpEpic() {
    return action$ => action$
      .pipe(
        ofType(AuthenticationActions.SIGN_UP_STARTED),
        switchMap((action: PayloadAction) => this.loginService.signUp(action.payload)
          .pipe(
            map((data: any) => {
              return this.authenticationActions.signUpSucceeded(!!data);
            }),
            catchError(data => of(this.authenticationActions.signUpFailed(data)))
          )
        )
      );
  }

  private loginEpic() {
    return action$ => action$
      .pipe(
        ofType(AuthenticationActions.LOGIN_STARTED),
        switchMap((action: PayloadAction) => this.loginService.logIn(action.payload)
          .pipe(
            map((data: {OK: boolean, token: string}) => {
              if (data.token) {
                setString('ProdToken', data.token);
              }
              return this.authenticationActions.loginSucceeded(data.OK);
            }),
            catchError(data => of(this.authenticationActions.loginFailed(data)))
          )
        )
      );
  }

  private logOutEpic() {
    return action$ => action$
      .pipe(
        ofType(AuthenticationActions.LOG_OUT_STARTED),
        switchMap(() => this.loginService.logOut()
          .pipe(
            map(() => {
              return this.authenticationActions.logOutSucceeded(true);
            }),
            catchError(data => of(this.authenticationActions.logOutFailed(data)))
          )
        )
      );
  }

  private redirectToLogin() {
    return action$ => action$
      .pipe(
        ofType(AuthenticationActions.LOG_OUT_SUCCEEDED),
        map(() => {
          setString('ProdToken', '');
          this.router.navigate(['./login']);
          return {type: '[AUTH_ACTION]REDIRECT_SUCCEEDED'};
        })
      );
  }
}
