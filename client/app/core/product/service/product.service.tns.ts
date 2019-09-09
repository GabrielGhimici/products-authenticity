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

  getProductById(id: number) {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/product/${id}`, {
      headers: this.httpConfig.getAuthorizationConfig(),
      params: {
        include: 'analytics,owner,productType,productionSteps,productionSteps.defaultProductionStep'
      }
    });
  }

  saveProduct(product) {
    return this.http.post(`${this.httpConfig.getApiConfig()}/api/product`, product, {
      headers: this.httpConfig.getAuthorizationConfig(),
    });
  }

  getProductListForOrganization() {
    return this.http.get(`${this.httpConfig.getApiConfig()}/api/product/organization`, {
      headers: this.httpConfig.getAuthorizationConfig(),
      params: {
        include: 'owner,productType,productionSteps,productionSteps.defaultProductionStep'
      }
    });
  }
}
