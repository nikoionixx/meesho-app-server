import { Body, Controller, Post, HttpException } from '@nestjs/common';
import { LoginAuthDto, SignAuthDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { SuccessResponse } from 'src/shared/services/success/success.response';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('login')
  public login(
    @Body() loginReq: LoginAuthDto,
  ): Promise<SuccessResponse | HttpException> {
    return this._authService.login(loginReq);
  }

  @Post('signup')
  public signup(
    @Body() signupReq: SignAuthDto,
  ): Promise<SuccessResponse | HttpException> {
    return this._authService.signup(signupReq);
  }
}
