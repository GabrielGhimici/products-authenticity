import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from '../../http-config/http-config.service';
import { filter, map } from 'rxjs/operators';
import { Role } from '../role';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../store/app-state';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private httpConfig: HttpConfigService,
    private store: NgRedux<AppState>
  ) { }

  getUser() {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/user/profile`, {
      headers: this.httpConfig.getAuthorizationConfig(),
      params: {
        include: 'role,entity'
      }
    });
  }

  getUsers() {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/user/all`, {
      headers: this.httpConfig.getAuthorizationConfig(),
      params: {
        include: 'role,parentEntity'
      }
    });
  }

  addUserToEntity(userId: number, entityId: number) {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/user/${userId}/add-to/${entityId}`, {
      headers: this.httpConfig.getAuthorizationConfig()
    });
  }

  updateUserRole(userId: number, roleId: number) {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/user/${userId}/switch-role-to/${roleId}`, {
      headers: this.httpConfig.getAuthorizationConfig()
    });
  }

  removeUserFromEntity(userId: number) {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/user/${userId}/remove-from-entity`, {
      headers: this.httpConfig.getAuthorizationConfig()
    });
  }

  hasProductManagementRights() {
    return this.store.select(['authenticatedUser', 'user', 'role']).pipe(
      filter((role: Role) => !!role),
      map((role: Role) => {
        return role.id !== 1;
      })
    );
  }

  hasUserManagementRights() {
    return this.store.select(['authenticatedUser', 'user', 'role']).pipe(
      filter((role: Role) => !!role),
      map((role: Role) => {
        return role.id === 3 || role.id === 4;
      })
    );
  }
}
