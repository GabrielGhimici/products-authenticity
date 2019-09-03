import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from '../../http-config/http-config.service';

@Injectable()
export class ProductService {
  constructor(
    private http: HttpClient,
    private httpConfig: HttpConfigService
  ) {}

  getProductByIdentifier(identifier: string) {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/product/identifier/${identifier}`, {
      headers: this.httpConfig.getAuthorizationConfig(),
      params: {
        include: 'productType,productionSteps,productionSteps.defaultProductionStep'
      }
    });
  }
}
