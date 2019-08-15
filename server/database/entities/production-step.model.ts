import { MaxLength, Property } from '@tsed/common';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export type StepStatus = 'waiting_goods' | 'producing' | 'finished' | 'deleted';

export class StepStatusTypes {
  static readonly WaitingGoods: StepStatus = 'waiting_goods';
  static readonly Producing: StepStatus = 'producing';
  static readonly Finished: StepStatus = 'finished';
  static readonly Deleted: StepStatus = 'deleted';
}

export class ProductionStep {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({name: 'id_type'})
  productTypeId: number;

  @Column()
  @MaxLength(100)
  name: string;

  @Column({
    type: 'enum',
    enum: [StepStatusTypes.WaitingGoods, StepStatusTypes.Producing, StepStatusTypes.Finished, StepStatusTypes.Deleted]
  })
  status: StepStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
