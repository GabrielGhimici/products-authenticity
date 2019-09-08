import { Service } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { QueryParameters } from '../query-params.model';
import { Product } from '../../database/entities/product.model';
import { Forbidden, NotFound, Unauthorized } from 'ts-httpexceptions';
import { User } from '../../database/entities/user.model';

@Service()
export class ProductService implements AfterRoutesInit {
  private readonly allIncludeValues = [
    'productType',
    'productType.defaultProductionSteps',
    'productType.products',
    'productionSteps',
    'productionSteps.defaultProductionStep'
  ];
  public connection: Connection;

  constructor(
    private typeORMService: TypeORMService
  ) {}

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

  public getProductById(id: number, queryParams: QueryParameters) {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.findOne(Product, {id}, {relations: relationsArr})
        .then((result: Product) => {
          if (!result) {
            throw new NotFound(`Unable to find product with identifier ${id}`);
          }
          return result;
        });
    }
    return this.connection.manager.findOne(Product, {id})
      .then((result: Product) => {
        if (!result) {
          throw new NotFound(`Unable to find product with identifier ${id}`);
        }
        return result;
      });
  }

  public getProductByOrganization(user: User, queryParams: QueryParameters) {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (!user) {
      throw new Unauthorized('Please login to see this feature');
    }
    if (user.roleId === 1) {
      throw new Forbidden('You don\'t have permission to see this list!');
    }
    if (!user.parentEntityId && user.roleId === 4) {
      if (includeList.length !== 0) {
        const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
        return this.connection.manager.find(Product, {relations: relationsArr});
      }
      return this.connection.manager.find(Product);
    }
    if (!user.parentEntityId && user.roleId !== 4) {
      return [];
    }
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.find(Product, {where: {ownerId: user.parentEntityId}, relations: relationsArr});
    }
    return this.connection.manager.find(Product, {ownerId: user.parentEntityId});
  }
}
