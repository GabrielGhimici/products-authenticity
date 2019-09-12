import { Required } from '@tsed/common';
import { ValidityUnit } from '../../database/entities/product.model';

export class ProductData {
  @Required()
  name: string;

  @Required()
  parentEntity: number;

  @Required()
  productType: number;

  validityTermQuantity: number;

  @Required()
  validityTermUnit: ValidityUnit;
}

export type BlockchainState = 0 | 1 | 2;
export class BlockchainStates {
  static readonly Producing: BlockchainState = 0;
  static readonly Finished: BlockchainState = 1;
  static readonly InQueue: BlockchainState = 2;
  static fromValue(value: number): BlockchainStepStatus {
    switch (value) {
      case 0:
        return BlockchainStates.Producing;
      case 1:
        return BlockchainStates.Finished;
      case 2:
        return BlockchainStates.InQueue;
      default:
        return null;
    }
  }
}

export type BlockchainStepStatus = 0 | 1 | 2;
export class BlockchainStepStatusTypes {
  static readonly Valid: BlockchainStepStatus = 0;
  static readonly Invalid: BlockchainStepStatus = 1;
  static readonly Indefinite: BlockchainStepStatus = 2;
  static fromValue(value: number): BlockchainStepStatus {
    switch (value) {
      case 0:
        return BlockchainStepStatusTypes.Valid;
      case 1:
        return BlockchainStepStatusTypes.Invalid;
      case 2:
        return BlockchainStepStatusTypes.Indefinite;
      default:
        return null;
    }
  }
}

export class BlockchainProduct {
  constructor(
    public id: number,
    public valid: boolean,
    public state: BlockchainState,
  ) {}
}

export class BlockchainStep {
  constructor(
    public id: number,
    public status: BlockchainStepStatus,
    public details: Array<BlockchainProductionDetail>
  ) {}
}

export class BlockchainProductionDetail {
  constructor(
    public message: string,
    public data: Date,
    public additionalId?: number
  ) {}
}


