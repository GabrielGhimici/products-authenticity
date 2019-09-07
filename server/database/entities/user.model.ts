import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { Role } from './role.model';
import { EntityModel } from './entity.model';
import { Analytics } from './analytics.model';

export type UserStatus = 'enabled' | 'disabled' | 'deleted';
export class UserStatusTypes {
  static readonly Enabled: UserStatus = 'enabled';
  static readonly Disabled: UserStatus = 'disabled';
  static readonly Deleted: UserStatus = 'deleted';
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({name: 'first_name'})
  @MaxLength(100)
  firstName: string;

  @Column({name: 'last_name'})
  @MaxLength(100)
  lastName: string;

  @Column({unique: true})
  @MaxLength(100)
  email: string;

  @Column({unique: true})
  @MaxLength(100)
  username: string;

  @Column({select: false})
  @MaxLength(256)
  password: string;

  @Column({select: false})
  @MaxLength(7)
  salt: string;

  @Column({name: 'id_role'})
  @Property()
  roleId: number;

  @Column({
    name: 'parent_entity_id',
    nullable: true
  })
  @Property()
  parentEntityId: number;

  @Column({name: 'blockchain_account'})
  @MaxLength(250)
  blockChainAccount: string;

  @Column({
    type: 'enum',
    enum: [UserStatusTypes.Enabled, UserStatusTypes.Disabled, UserStatusTypes.Deleted],
    default: UserStatusTypes.Enabled
  })
  @Property()
  status: UserStatus;

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;

  @OneToOne(() => Role, role => role.users)
  @JoinColumn({name: 'id_role'})
  @Property()
  role: Role;

  @OneToOne(() => EntityModel, entity => entity.users)
  @JoinColumn({name: 'parent_entity_id'})
  @Property()
  parentEntity: EntityModel;

  @OneToMany(() => Analytics, analytics => analytics.user)
  @Property()
  analytics: Analytics[];
}
