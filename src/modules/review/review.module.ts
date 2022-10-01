import { Module } from '@nestjs/common';
import { ProductReview } from './entitie/review.entitie';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([ProductReview])],
})
export class ReviewModule {}
