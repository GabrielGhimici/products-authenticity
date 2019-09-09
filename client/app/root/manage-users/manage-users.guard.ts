import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'client/app/core/user/service/user.service';

@Injectable()
export class ManageUsersGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate() {
    return this.userService.hasUserManagementRights()
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
