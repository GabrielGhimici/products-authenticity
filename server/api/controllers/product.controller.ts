import { Controller, Get, PathParams, QueryParams, Use } from '@tsed/common';
import { ProductService } from '../product/product.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { QueryParameters } from '../query-params.model';

@Controller('/product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) {}

  @Get('/identifier/:identifier')
  @Use(AuthMiddleware)
  public getProductByIdentifier(
    @PathParams('identifier') identifier: string,
    @QueryParams() queryParams: QueryParameters
  ) {
    return this.productService.getProductByIdentifier(identifier, queryParams);
  }
}
