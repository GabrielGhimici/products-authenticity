import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';

export type ValidityUnit = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
export class ValidityUnits {
  static readonly Hour: ValidityUnit = 'hour';
  static readonly Day: ValidityUnit = 'day';
  static readonly Week: ValidityUnit = 'week';
  static readonly Month: ValidityUnit = 'month';
  static readonly Year: ValidityUnit = 'year';
  static readonly All: ValidityUnit = 'all';
}

export type ProductStatus = 'in-stock' | 'delivered' | 'deleted';
export class ProductStatusTypes {
  static readonly InStock: ProductStatus = 'in-stock';
  static readonly Delivered: ProductStatus = 'delivered';
  static readonly Deleted: ProductStatus = 'deleted';
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({name: 'id_type'})
  productTypeId: number;

  @Column()
  @MaxLength(100)
  name: string;

  @Column({
    name: 'public_identifier',
    unique: true
  })
  @MaxLength(100)
  publicIdentifier: string;

  @Column({name: 'production_date'})
  productionDate: Date;

  @Column({name: 'validity_term_quantity'})
  validityTermQuantity: number;

  @Column({
    name: 'validity_term_unit',
    type: 'enum',
    enum: [ValidityUnits.Hour, ValidityUnits.Day, ValidityUnits.Week, ValidityUnits.Month, ValidityUnits.Year, ValidityUnits.All]
  })
  validityTermUnit: ValidityUnit;

  @Column({
    type: 'enum',
    enum: [ProductStatusTypes.InStock, ProductStatusTypes.Delivered, ProductStatusTypes.Deleted]
  })
  status: ProductStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
