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
        include: 'productType,productionSteps,productionSteps.defaultProductionStep'
      }
    });
  }
}
