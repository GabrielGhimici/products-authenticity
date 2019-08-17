import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  private getCookies() {
    const pairs = document.cookie.replace(/\s/g, '').split(';');
    const cookies = {};
    for (const rawPair of pairs) {
      const pair = rawPair.split('=');
      cookies[pair[0]] = pair[1];
    }
    return cookies;
  }

  canActivate() {
    return this.loginService.isLoggedIn()
      .pipe(
        map(value => {
          const cookies = this.getCookies();
          // tslint:disable-next-line:no-string-literal
          if (!value || !cookies['ProdToken']) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }
}
