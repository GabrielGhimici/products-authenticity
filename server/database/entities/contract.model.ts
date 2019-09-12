import { MaxLength, Property } from '@tsed/common';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(500)
  name: string;

  @Column()
  @MaxLength(500)
  address: string;

  @Column({type: 'mediumtext'})
  abi: string;

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;
}
