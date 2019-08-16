import { Injectable } from '@angular/core';
import { LoginService } from '../../core/login/service/login.service';
import { AuthenticationActions } from './authentication.actions';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PayloadAction } from '../../store/payload-action';
import { of } from 'rxjs';
import { getString, setString } from 'tns-core-modules/application-settings';

@Injectable()
export class AuthenticationEpic {

  constructor(private loginService: LoginService,
              private authenticationActions: AuthenticationActions) {}

  public createEpic() {
    return combineEpics(this.loginEpic());
  }

  private loginEpic() {
    return action$ => action$
      .pipe(
        ofType(AuthenticationActions.LOGIN_STARTED),
        switchMap((action: PayloadAction) => this.loginService.logIn(action.payload)
          .pipe(
            map((data: {OK: boolean, token: string}) => {
              if (data.token && setString) {
                alert(`${data.token} - ${getString('ProdToken')}`);
                setString('ProdToken', data.token);
                alert(`${data.token} - ${getString('ProdToken')}`);
              }
              return this.authenticationActions.loginSucceeded(data.OK);
            }),
            catchError(data => of(this.authenticationActions.loginFailed(data)))
          )
        )
      );
  }
}
