import { Body, Controller, Post, HttpException, NotFoundException } from '@nestjs/common';
import { LoginAuthDto, SignAuthDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { SuccessResponse } from 'src/shared/services/success/success.response';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() loginReq: LoginAuthDto,
  ): Promise<SuccessResponse | HttpException> {
    return await this._authService.login(loginReq);
  }

  @Post('signup')
  public async signup(
    @Body() signupReq: SignAuthDto,
  ): Promise<SuccessResponse | HttpException> {
    return await this._authService.signup(signupReq);
  }
}
