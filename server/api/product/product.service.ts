import { Service } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { QueryParameters } from '../query-params.model';
import { Product } from '../../database/entities/product.model';
import { NotFound } from 'ts-httpexceptions';

@Service()
export class ProductService implements AfterRoutesInit {
  private readonly allIncludeValues = ['productType', 'productType.productionSteps'];
  public connection: Connection;

  constructor(
    private typeORMService: TypeORMService
  ) {
  }

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    return null;
  }

  public getProductByIdentifier(identifier: string, queryParams: QueryParameters) {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.findOne(Product, {publicIdentifier: identifier}, {relations: relationsArr})
        .then((result: Product) => {
          if (!result) {
            throw new NotFound(`Unable to find product with identifier ${identifier}`);
          }
          return result;
        });
    }
    return this.connection.manager.findOne(Product, {publicIdentifier: identifier})
      .then((result: Product) => {
        if (!result) {
          throw new NotFound(`Unable to find product with identifier ${identifier}`);
        }
        return result;
      });
  }
}
