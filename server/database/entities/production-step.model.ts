import { MaxLength, Property } from '@tsed/common';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, Entity, JoinColumn } from 'typeorm';
import { ProductType } from './product-type.model';

export type StepStatus = 'waiting_goods' | 'producing' | 'finished' | 'deleted';

export class StepStatusTypes {
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

  @Column({name: 'id_type'})
  @Property()
  productTypeId: number;

  @Column()
  @MaxLength(100)
  name: string;

  @Column({
    type: 'enum',
    enum: [StepStatusTypes.WaitingGoods, StepStatusTypes.Producing, StepStatusTypes.Finished, StepStatusTypes.Deleted]
  })
  @Property()
  status: StepStatus;

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;

  @OneToOne(() => ProductType, productType => productType.productionSteps)
  @JoinColumn({name: 'id_type'})
  @Property()
  productType: ProductType;

}
