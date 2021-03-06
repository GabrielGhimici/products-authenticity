import { BodyParams, Controller, Get, PathParams, Post, QueryParams, Request, UseBefore } from '@tsed/common';
import { ProductService } from '../product/product.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { QueryParameters } from '../query-params.model';
import { ProductData } from '../product/product.data';
import { Product } from '../../database/entities/product.model';

@Controller('/product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) {}

  @Post('/')
  @UseBefore(AuthMiddleware)
  public saveProduct(
    @Request() req,
    @BodyParams() product: ProductData
  ) {
    return this.productService.saveProduct(req.session.user.id, product);
  }

  @Get('/organization')
  @UseBefore(AuthMiddleware)
  public getProductByOrganization(
    @Request() req,
    @QueryParams() queryParams: QueryParameters
  ) {
    return this.productService.getProductByOrganization(req.session.user, queryParams);
  }


  @Get('/types')
  @UseBefore(AuthMiddleware)
  public getProductTypes(
    @QueryParams() queryParams: QueryParameters
  ) {
    return this.productService.getProductTypes(queryParams);
  }

  @Get('/identifier/:identifier')
  @UseBefore(AuthMiddleware)
  public getProductByIdentifier(
    @Request() req,
    @PathParams('identifier') identifier: string,
    @QueryParams() queryParams: QueryParameters
  ) {
    return this.productService.getProductByIdentifier(req.session.user, identifier, queryParams);
  }

  @Get('/:id')
  @UseBefore(AuthMiddleware)
  public getProductById(
    @Request() req,
    @PathParams('id') id: number,
    @QueryParams() queryParams: QueryParameters
  ): Promise<Product> {
    return this.productService.getProductById(req.session.user, id, queryParams);
  }

}
