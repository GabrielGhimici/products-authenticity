import { Product } from './product';
import { DefaultProductionStep } from './default-production-step';

export class ProductType {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
  defaultProductionSteps: DefaultProductionStep[];

  constructor(source: { [key: string]: any } = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.name = source.hasOwnProperty('name') ? source.name : null;
    this.description = source.hasOwnProperty('description') ? source.description : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.createdAt = source.hasOwnProperty('createdAt') ? source.createdAt : null;
    this.updatedAt = source.hasOwnProperty('updatedAt') ? source.updatedAt : null;
    this.products = source.hasOwnProperty('products') ? source.products.map(product => new Product(product)) : null;
    this.defaultProductionSteps = source.hasOwnProperty('defaultProductionSteps')
      ? source.defaultProductionSteps.map(productionStep => new DefaultProductionStep(productionStep))
      : null;
  }
}
