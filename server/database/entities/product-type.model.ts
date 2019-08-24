import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { Product } from './product.model';
import { ProductionStep } from './production-step.model';

export type ProductTypeStatus = 'enabled' | 'disabled' | 'deleted';
export class ProductTypeStatusTypes {
  static readonly Enabled: ProductTypeStatus = 'enabled';
  static readonly Disabled: ProductTypeStatus = 'disabled';
  static readonly Deleted: ProductTypeStatus = 'deleted';
}

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(100)
  name: string;

  @Column()
  @MaxLength(500)
  description: string;

  @Column({
    type: 'enum',
    enum: [ProductTypeStatusTypes.Enabled, ProductTypeStatusTypes.Disabled, ProductTypeStatusTypes.Deleted],
    default: ProductTypeStatusTypes.Enabled
  })
  @Property()
  status: ProductTypeStatus;

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;

  @OneToMany(() => Product, product => product.productType)
  @Property()
  products: Product[];

  @OneToMany(() => ProductionStep, productionStep => productionStep.productType)
  @Property()
  productionSteps: ProductionStep[];
}
