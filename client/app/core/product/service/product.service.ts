import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  getProductByIdentifier(identifier: string) {
    return this.http.get(`/api/product/identifier/${identifier}`, {
      params: {
        include: 'owner,productType,productionSteps,productionSteps.defaultProductionStep'
      }
    });
  }

  getProductById(id: number) {
    return this.http.get(`/api/product/${id}`, {
      params: {
        include: 'analytics,owner,productType,productionSteps,productionSteps.defaultProductionStep'
      }
    });
  }

  saveProduct(product) {
    return this.http.post(`/api/product`, product);
  }

  getProductListForOrganization() {
    return this.http.get(`/api/product/organization`, {
      params: {
        include: 'owner,productType,productionSteps,productionSteps.defaultProductionStep'
      }
    });
  }
}
