import { Property } from '@tsed/common';
import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './product.model';
import { DefaultProductionStep } from './default-production-step.model';
import { BlockchainStep } from '../../api/product/product.data';

export type StepStatus = 'inactive' | 'waiting_goods' | 'producing' | 'finished' | 'deleted';

export class StepStatusTypes {
  static readonly Inactive: StepStatus = 'inactive';
  static readonly WaitingGoods: StepStatus = 'waiting_goods';
  static readonly Producing: StepStatus = 'producing';
  static readonly Finished: StepStatus = 'finished';
  static readonly Deleted: StepStatus = 'deleted';
}

@Entity()
export class ProductionStep {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({name: 'id_product'})
  @Property()
  productId: number;

  @Property()
  blockchainStatus: BlockchainStep;

  @Column({name: 'id_default_step'})
  @Property()
  defaultProductionStepId: number;

  @Column({
    type: 'enum',
    enum: [
      StepStatusTypes.Inactive,
      StepStatusTypes.WaitingGoods,
      StepStatusTypes.Producing,
      StepStatusTypes.Finished,
      StepStatusTypes.Deleted
    ]
  })
  @Property()
  status: StepStatus;

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;

  @OneToOne(() => Product, product => product.productionSteps)
  @JoinColumn({name: 'id_product'})
  @Property()
  product: Product;

  @OneToOne(() => DefaultProductionStep, defaultProductionStep => defaultProductionStep.productionSteps)
  @JoinColumn({name: 'id_default_step'})
  @Property()
  defaultProductionStep: DefaultProductionStep;
}
