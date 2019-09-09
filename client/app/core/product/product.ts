import { ProductType } from './product-type';
import { ProductionStep } from './production-step';
import { Analytics } from '../analytics/analytics';
import { Entity } from '../entity/entity';

export class Product {
  id: number;
  productTypeId: number;
  name: string;
  publicIdentifier: string;
  productionDate: Date;
  validityTermQuantity: number;
  validityTermUnit: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  productType: ProductType;
  productionSteps: ProductionStep[];
  analytics: Analytics[];
  owner: Entity;

  constructor(source: { [key: string]: any } = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.productTypeId = source.hasOwnProperty('productTypeId') ? source.productTypeId : null;
    this.name = source.hasOwnProperty('name') ? source.name : null;
    this.publicIdentifier = source.hasOwnProperty('publicIdentifier') ? source.publicIdentifier : null;
    this.productionDate = source.hasOwnProperty('productionDate') ? source.productionDate : null;
    this.validityTermQuantity = source.hasOwnProperty('validityTermQuantity') ? source.validityTermQuantity : null;
    this.validityTermUnit = source.hasOwnProperty('validityTermUnit') ? source.validityTermUnit : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.createdAt = source.hasOwnProperty('createdAt') ? source.createdAt : null;
    this.updatedAt = source.hasOwnProperty('updatedAt') ? source.updatedAt : null;
    this.productType = source.hasOwnProperty('productType') ? new ProductType(source.productType) : null;
    this.productionSteps = source.hasOwnProperty('productionSteps')
      ? source.productionSteps.map(productionStep => new ProductionStep(productionStep))
      : [];
    this.analytics = source.hasOwnProperty('analytics')
      ? source.analytics.map(analytics => new Analytics(analytics))
      : [];
    this.owner = source.hasOwnProperty('owner') ? new Entity(source.owner) : null;
  }
}
