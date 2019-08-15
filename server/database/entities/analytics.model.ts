import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '@tsed/common';

export type Platform = 'mobile' | 'web';
export class Platforms {
  static readonly Mobile: Platform = 'mobile';
  static readonly Web: Platform = 'web';
}

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  date: Date;

  @Column({name: 'id_user'})
  userId: number;

  @Column({name: 'id_product'})
  productId: number;

  @Column({
    type: 'enum',
    enum: [Platforms.Mobile, Platforms.Web],
  })
  platform: Platform;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
