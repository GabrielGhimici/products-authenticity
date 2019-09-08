import { MaxLength, Property } from '@tsed/common';
import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from './user.model';
import { Product } from './product.model';

export type EntityType = 'seller' | 'provider';
export class EntityTypes {
  static readonly Seller: EntityType = 'seller';
  static readonly Provider: EntityType = 'provider';
}

export type EntityStatus = 'enabled' | 'disabled' | 'deleted';
export class EntityStatusTypes {
  static readonly Enabled: EntityStatus = 'enabled';
  static readonly Disabled: EntityStatus = 'disabled';
  static readonly Deleted: EntityStatus = 'deleted';
}

@Entity({name: 'entity'})
export class EntityModel {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(100)
  name: string;

  @Column({
    type: 'enum',
    enum: [EntityTypes.Seller, EntityTypes.Provider]
  })
  type: EntityType;

  @Column()
  @MaxLength(500)
  description: string;

  @Column({
    name: 'legal_identifier'
  })
  @MaxLength(100)
  legalIdentifier: string;

  @Column({
    type: 'enum',
    enum: [EntityStatusTypes.Enabled, EntityStatusTypes.Disabled, EntityStatusTypes.Deleted],
    default: EntityStatusTypes.Enabled
  })
  status: EntityStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, user => user.parentEntity)
  users: User[];

  @OneToMany(() => Product, product => product.owner)
  products: Product[];
}
