import { Module } from '@nestjs/common';
import { AuthController } from './contoller/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule],
})
export class AuthModule {}
