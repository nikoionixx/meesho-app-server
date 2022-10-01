import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/modules/product/entitie/product.entity';
import { ProductReview } from 'src/modules/review/entitie/review.entitie';
import { User } from 'src/modules/user/entitie/user.entities';

export const PostgresOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'nikhil',
  port: 5432,
  database: 'meesho',
  synchronize: true,
  entities: [User, Product, ProductReview],
};
