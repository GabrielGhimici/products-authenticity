import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    return this.http.get('/api/user/profile', {
      params: {
        include: 'role,entity'
      }
    });
  }
}
