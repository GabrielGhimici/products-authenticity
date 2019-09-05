import { Column, Entity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Property } from '@tsed/common';
import { Product } from './product.model';
import { User } from './user.model';

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
  @Property()
  date: Date;

  @Column({name: 'id_user'})
  @Property()
  userId: number;

  @Column({name: 'id_product'})
  @Property()
  productId: number;

  @Column({
    type: 'enum',
    enum: [Platforms.Mobile, Platforms.Web],
  })
  @Property()
  platform: Platform;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Product, product => product.analytics)
  @JoinColumn({name: 'id_product'})
  @Property()
  product: Product;

  @OneToOne(() => User, user => user.analytics)
  @JoinColumn({name: 'id_user'})
  @Property()
  user: User;
}
