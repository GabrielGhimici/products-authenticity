import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { getString } from 'tns-core-modules/application-settings';
import { LoginService } from './service/login.service.tns';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate() {
    return this.loginService.isLoggedIn()
      .pipe(
        map(value => {
          if (!value || !getString('ProdToken')) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }
}
