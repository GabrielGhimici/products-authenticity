import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from '../../http-config/http-config.service';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private httpConfig: HttpConfigService
  ) { }

  getUser() {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/user/profile`, {
      headers: this.httpConfig.getAuthorizationConfig(),
      params: {
        include: 'role,entity'
      }
    });
  }
}
