import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { DATA_SOURCES } from '../../store/data-source/data-source.data';
import { map } from 'rxjs/operators';
import { Role } from '../user/role';
import { Entity } from '../entity/entity';
import { ProductType } from '../product/product-type';

@Injectable()
export class DataSourceService {

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line:variable-name
  public getAll(type: string, _params: any) {
    switch (type) {
      case DATA_SOURCES.ENTITY: {
        return this.http.get('/api/entity/sellers').pipe(
          map((data: Array<any>) => {
            if (!data) {
              data = [];
            }
            return data.map((el) => new Entity(el));
          })
        );
      }
      case DATA_SOURCES.ROLE: {
        return this.http.get('/api/user/roles').pipe(
          map((data: Array<any>) => {
            if (!data) {
              data = [];
            }
            return data.map((el) => new Role(el));
          })
        );
      }
      case DATA_SOURCES.PRODUCT_TYPE: {
        return this.http.get('/api/product/types').pipe(
          map((data: Array<any>) => {
            if (!data) {
              data = [];
            }
            return data.map((el) => new ProductType(el));
          })
        );
      }
      default:
        return of([]);
    }
  }

}
