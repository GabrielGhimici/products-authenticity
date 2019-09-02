import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { getString } from 'tns-core-modules/application-settings';

@Injectable()
export class HttpConfigService {
  constructor() { }

  getApiConfig() {
    return `${environment.apiScheme}://${environment.apiHost}${environment.apiPort ? ':' + environment.apiPort : ''}`;
  }

  getAuthorizationConfig() {
    const token = getString('ProdToken');
    return {
      Authorization: token ? token : ''
    };
  }
}
