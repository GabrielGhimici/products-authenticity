import { Product } from './product';
import { DefaultProductionStep } from './default-production-step';


export class ProductionStep {
  id: number;
  productId: number;
  defaultProductionStepId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  defaultProductionStep: DefaultProductionStep;

  constructor(source: { [key: string]: any } = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.productId = source.hasOwnProperty('productId') ? source.productId : null;
    this.defaultProductionStepId = source.hasOwnProperty('defaultProductionStepId') ? source.defaultProductionStepId : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.createdAt = source.hasOwnProperty('createdAt') ? source.createdAt : null;
    this.updatedAt = source.hasOwnProperty('updatedAt') ? source.updatedAt : null;
    this.product = source.hasOwnProperty('product') ? new Product(source.product) : null;
    this.defaultProductionStep = source.hasOwnProperty('defaultProductionStep')
      ? new DefaultProductionStep(source.defaultProductionStep)
      : null;
  }
}
