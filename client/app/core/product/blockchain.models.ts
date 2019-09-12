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
  public id: number;
  public valid: boolean;
  public state: BlockchainState;
  constructor(source: { [key: string]: any } = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.valid = source.hasOwnProperty('valid') ? source.valid : null;
    this.state = source.hasOwnProperty('state') ? source.state : null;
  }
}

export class BlockchainStep {
  public id: number;
  public status: BlockchainStepStatus;
  public details: Array<BlockchainProductionDetail>;
  constructor(source: { [key: string]: any } = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.details = source.hasOwnProperty('details') ? source.details.map(detail => new BlockchainProductionDetail(detail)) : [];
  }
}

export class BlockchainProductionDetail {
  public message: string;
  public data: Date;
  public additionalId?: number;
  constructor(source: { [key: string]: any } = {}) {
    this.message = source.hasOwnProperty('message') ? source.message : null;
    this.data = source.hasOwnProperty('data') ? source.data : null;
    this.additionalId = source.hasOwnProperty('additionalId') ? source.additionalId : null;
  }
}
