import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresOrmOptions } from 'src/middleware/db/typeorm/options.typeorm';
import { AuthModule } from './auth/auth.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { TestController } from './test.controller';
import { UserModule } from './user/user.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    OrderModule,
    CheckoutModule,
    UserModule,
    TypeOrmModule.forRoot(PostgresOrmOptions),
    WishlistModule,
    ReviewModule,
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
