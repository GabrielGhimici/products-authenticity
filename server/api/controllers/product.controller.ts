import { Controller, Get, PathParams, QueryParams, Request, UseBefore } from '@tsed/common';
import { ProductService } from '../product/product.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { QueryParameters } from '../query-params.model';

@Controller('/product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) {}

  @Get('/organization')
  @UseBefore(AuthMiddleware)
  public getProductByOrganization(
    @Request() req,
    @QueryParams() queryParams: QueryParameters
  ) {
    return this.productService.getProductByOrganization(req.session.user, queryParams);
  }

  @Get('/identifier/:identifier')
  @UseBefore(AuthMiddleware)
  public getProductByIdentifier(
    @PathParams('identifier') identifier: string,
    @QueryParams() queryParams: QueryParameters
  ) {
    return this.productService.getProductByIdentifier(identifier, queryParams);
  }

  @Get('/:id')
  @UseBefore(AuthMiddleware)
  public getProductById(
    @PathParams('id') id: number,
    @QueryParams() queryParams: QueryParameters
  ) {
    return this.productService.getProductById(id, queryParams);
  }

}
