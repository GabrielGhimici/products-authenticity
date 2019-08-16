import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpConfigService {
  constructor() { }

  getApiConfig() {
    return `${environment.apiScheme}://${environment.apiHost}:${environment.apiPort}`;
  }
}
