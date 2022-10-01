import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductReview } from '../../review/entitie/review.entitie';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => ProductReview, (review) => review.id)
  reviews: ProductReview[];
}
