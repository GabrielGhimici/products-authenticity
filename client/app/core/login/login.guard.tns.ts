import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { filter, map } from 'rxjs/operators';
import { isUndefined } from 'tns-core-modules/utils/types';
import { getString } from 'tns-core-modules/application-settings';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate() {
    return this.loginService.isLoggedIn
      .pipe(
        filter(value => !isUndefined(value))
      ).pipe(
        map(value => {
          alert(`${value} - ${getString('ProdToken')}`)
          if (!value || getString('ProdToken')) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }
}
