import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { User } from './user.model';

@Entity()
export class UserData {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({name: 'user_id'})
  @Property()
  userId: number;

  @Column({name: 'unlock_data'})
  @MaxLength(1000)
  unlockData: string;

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;

  @OneToOne(() => User, user => user.userData)
  @JoinColumn({name: 'user_id'})
  @Property()
  user: User;

}
