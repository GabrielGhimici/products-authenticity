import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';

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
  status: ProductTypeStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
