import { ProductType } from './product-type';
import { ProductionStep } from './production-step';

export class DefaultProductionStep {
  id: number;
  productTypeId: number;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  productType: ProductType;
  productionSteps: ProductionStep[];

  constructor(source: { [key: string]: any } = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.productTypeId = source.hasOwnProperty('productTypeId') ? source.productTypeId : null;
    this.name = source.hasOwnProperty('name') ? source.name : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.createdAt = source.hasOwnProperty('createdAt') ? source.createdAt : null;
    this.updatedAt = source.hasOwnProperty('updatedAt') ? source.updatedAt : null;
    this.productType = source.hasOwnProperty('productType') ? new ProductType(source.productType) : null;
    this.productionSteps = source.hasOwnProperty('productionSteps')
      ? source.productionSteps.map(productionStep => new ProductionStep(productionStep))
      : null;
  }
}
