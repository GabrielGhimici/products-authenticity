import { Product } from './product';
import { DefaultProductionStep } from './default-production-step';
import { BlockchainStep } from './blockchain.models';


export class ProductionStep {
  id: number;
  productId: number;
  defaultProductionStepId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  defaultProductionStep: DefaultProductionStep;
  blockchainStatus: BlockchainStep;

  constructor(source: { [key: string]: any } = {}) {
    this.id = (source.hasOwnProperty('id') && source.id) ? source.id : null;
    this.productId = (source.hasOwnProperty('productId') && source.productId) ? source.productId : null;
    this.defaultProductionStepId = (source.hasOwnProperty('defaultProductionStepId') && source.defaultProductionStepId)
      ? source.defaultProductionStepId : null;
    this.status = (source.hasOwnProperty('status') && source.status) ? source.status : null;
    this.createdAt = (source.hasOwnProperty('createdAt') && source.createdAt) ? source.createdAt : null;
    this.updatedAt = (source.hasOwnProperty('updatedAt') && source.updatedAt) ? source.updatedAt : null;
    this.product = (source.hasOwnProperty('product') && source.product) ? new Product(source.product) : null;
    this.defaultProductionStep = (source.hasOwnProperty('defaultProductionStep') && source.defaultProductionStep)
      ? new DefaultProductionStep(source.defaultProductionStep)
      : null;
    this.blockchainStatus = (source.hasOwnProperty('blockchainStatus') && source.blockchainStatus)
      ? new BlockchainStep(source.blockchainStatus) : null;
  }
}
