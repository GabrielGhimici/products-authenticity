import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { ProductType } from './product-type.model';
import { ProductionStep } from './production-step.model';
import { Analytics } from './analytics.model';

export type ValidityUnit = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
export class ValidityUnits {
  static readonly Hour: ValidityUnit = 'hour';
  static readonly Day: ValidityUnit = 'day';
  static readonly Week: ValidityUnit = 'week';
  static readonly Month: ValidityUnit = 'month';
  static readonly Year: ValidityUnit = 'year';
  static readonly All: ValidityUnit = 'all';
}

export type ProductStatus = 'in-stock' | 'delivered' | 'producing' | 'deleted';
export class ProductStatusTypes {
  static readonly InStock: ProductStatus = 'in-stock';
  static readonly Delivered: ProductStatus = 'delivered';
  static readonly Producing: ProductStatus = 'producing';
  static readonly Deleted: ProductStatus = 'deleted';
}

@Entity()
export class Product {
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
    name: 'public_identifier',
    unique: true
  })
  @Property()
  @MaxLength(100)
  publicIdentifier: string;

  @Column({name: 'production_date'})
  @Property()
  productionDate: Date;

  @Column({name: 'validity_term_quantity'})
  @Property()
  validityTermQuantity: number;

  @Column({
    name: 'validity_term_unit',
    type: 'enum',
    enum: [ValidityUnits.Hour, ValidityUnits.Day, ValidityUnits.Week, ValidityUnits.Month, ValidityUnits.Year, ValidityUnits.All]
  })
  @Property()
  validityTermUnit: ValidityUnit;

  @Column({
    type: 'enum',
    enum: [ProductStatusTypes.InStock, ProductStatusTypes.Delivered, ProductStatusTypes.Producing, ProductStatusTypes.Deleted]
  })
  @Property()
  status: ProductStatus;

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;

  @OneToOne(() => ProductType, productType => productType.products)
  @JoinColumn({name: 'id_type'})
  @Property()
  productType: ProductType;

  @OneToMany(() => ProductionStep, productionStep => productionStep.product)
  @Property()
  productionSteps: ProductionStep[];

  @OneToMany(() => Analytics, analytics => analytics.product)
  @Property()
  analytics: Analytics[];
}
