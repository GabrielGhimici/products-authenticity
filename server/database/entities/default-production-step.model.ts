import { MaxLength, Property } from '@tsed/common';
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, Entity, JoinColumn, OneToMany } from 'typeorm';
import { ProductType } from './product-type.model';
import { ProductionStep } from './production-step.model';

export type DefaultStepStatus = 'enabled' | 'disabled' | 'deleted';
export class DefaultStepStatusTypes {
  static readonly Enabled: DefaultStepStatus = 'enabled';
  static readonly Disabled: DefaultStepStatus = 'disabled';
  static readonly Deleted: DefaultStepStatus = 'deleted';
}

@Entity()
export class DefaultProductionStep {
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
    enum: [DefaultStepStatusTypes.Enabled, DefaultStepStatusTypes.Disabled, DefaultStepStatusTypes.Deleted]
  })
  @Property()
  status: DefaultStepStatus;

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

  @OneToMany( () => ProductionStep, productionStep => productionStep.defaultProductionStep)
  productionSteps: ProductionStep[];

}
