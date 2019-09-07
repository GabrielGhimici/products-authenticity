import { Service } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { Analytics } from '../../database/entities/analytics.model';
import { InternalServerError } from 'ts-httpexceptions';
import { uniqBy } from 'lodash';
import { Product } from '../../database/entities/product.model';

@Service()
export class AnalyticsService implements AfterRoutesInit {
  public connection: Connection;

  constructor(
    private typeORMService: TypeORMService
  ) {}

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    return null;
  }

  public getAnalyticsByUser(userId: number) {
    return this.connection.manager.find(Analytics, {where: {userId}, relations: ['user', 'product', 'product.productType']})
      .then((analytics: Array<Analytics>) => {
        const productInfos = uniqBy(analytics.map((el: Analytics) => {
          return {
            id: el.productId,
            product: el.product
          };
        }), 'id');
        return productInfos.map((element: {id: number, product: Product}) => {
          const enrichedProduct = element.product;
          enrichedProduct.analytics = analytics
            .filter((anaEl: Analytics) => anaEl.productId === element.id)
            .map((anaEl: Analytics) => {
              delete anaEl.product;
              return anaEl;
            });
          return enrichedProduct;
        });
      })
      .catch((error) => {
        throw new InternalServerError(error.message);
      });
  }
}
