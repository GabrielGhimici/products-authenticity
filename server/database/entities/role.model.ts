import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';

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
  status: RoleStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
