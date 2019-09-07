import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../store/app-state';
import { filter, map } from 'rxjs/operators';
import { Role } from '../role';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private store: NgRedux<AppState>
  ) { }

  getUser() {
    return this.http.get('/api/user/profile', {
      params: {
        include: 'role,parentEntity'
      }
    });
  }

  getUsers() {
    return this.http.get('/api/user/all', {
      params: {
        include: 'role,parentEntity'
      }
    });
  }

  addUserToEntity(userId: number, entityId: number) {
    return this.http.get(`/api/user/${userId}/add-to/${entityId}`);
  }

  updateUserRole(userId: number, roleId: number) {
    return this.http.get(`/api/user/${userId}/switch-role-to/${roleId}`);
  }

  removeUserFromEntity(userId: number) {
    return this.http.get(`/api/user/${userId}/remove-from-entity`);
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
