import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { User } from './user.model';

export type RoleStatus = 'enabled' | 'disabled' | 'deleted';
export class RoleStatusTypes {
  static readonly Enabled: RoleStatus = 'enabled';
  static readonly Disabled: RoleStatus = 'disabled';
  static readonly Deleted: RoleStatus = 'deleted';
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(100)
  name: string;

  @Column({
    type: 'enum',
    enum: [RoleStatusTypes.Enabled, RoleStatusTypes.Disabled, RoleStatusTypes.Deleted],
    default: RoleStatusTypes.Enabled
  })
  @Property()
  status: RoleStatus;

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
