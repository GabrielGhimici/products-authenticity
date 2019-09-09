import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'client/app/core/user/service/user.service';

@Injectable()
export class ProductManagementGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate() {
    return this.userService.hasProductManagementRights()
      .pipe(
        map(value => {
          if (!value) {
            this.router.navigate(['/main']);
            return false;
          }
          return true;
        })
      );
  }
}
