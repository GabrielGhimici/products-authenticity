import { Product } from './product';
import { ProductionStep } from './production-step';

export class ProductType {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
  productionSteps: ProductionStep[];

  constructor(source: { [key: string]: any } = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.name = source.hasOwnProperty('name') ? source.name : null;
    this.description = source.hasOwnProperty('description') ? source.description : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.createdAt = source.hasOwnProperty('createdAt') ? source.createdAt : null;
    this.updatedAt = source.hasOwnProperty('updatedAt') ? source.updatedAt : null;
    this.products = source.hasOwnProperty('products') ? source.products.map(product => new Product(product)) : null;
    this.productionSteps = source.hasOwnProperty('productionSteps')
      ? source.productionSteps.map(productionStep => new ProductionStep(productionStep))
      : null;
  }
}
