import {
  Injectable,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignAuthDto, LoginAuthDto } from '../dto/auth.dto';
import { User } from '../../user/entitie/user.entities';
import * as bcrypt from 'bcrypt';
import { SuccessResponse } from 'src/shared/services/success/success.response';
import { ErrorResponse } from 'src/shared/services/error/error.response';
import { ERROR_CODE } from 'src/shared/constants/error-code/error-code.constant';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private _userRespository: Repository<User>,
  ) {}

  public async login(
    loginReq: LoginAuthDto,
  ): Promise<SuccessResponse | HttpException> {
    try {
      return await this._login(loginReq);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      this._sendUnknownException();
    }
  }

  public async signup(
    signupReq: SignAuthDto,
  ): Promise<SuccessResponse | HttpException> {
    try {
      return await this._signup(signupReq);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      this._sendUnknownException();
    }
  }

  private async _signup(
    signupReq: SignAuthDto,
  ): Promise<SuccessResponse | HttpException> {
    const { emailId, password, phoneNumber, firstName, lastName } = signupReq;
    // Create a User
    const user = new User();
    user.emailId = emailId;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;

    // Hasing the Password
    user.password = await this._hashPassword(password);
    // saving the user
    await this._userRespository.save(user);
    return new SuccessResponse('User succesfully created', null);
  }

  private async _login(
    loginReq: LoginAuthDto,
  ): Promise<SuccessResponse | HttpException> {
    const { emailId, password } = loginReq;

    // Find User
    const user = await this._userRespository.findOneBy({ emailId });

    // User Does not exist
    if (!user) {
      throw new NotFoundException(
        new ErrorResponse(
          ERROR_CODE.ERR_NO_USER_FOUND.code,
          ERROR_CODE.ERR_NO_USER_FOUND.message,
          HttpStatus.NOT_FOUND,
        ),
      );
    }

    // If User exists compare password
    const isSamePassword = await this._comparePassword(password, user);

    // If Password is not same
    if (!isSamePassword) {
      throw new BadRequestException(
        new ErrorResponse(
          ERROR_CODE.ERR_INVALID_PASSWORD_EMAILID.code,
          ERROR_CODE.ERR_INVALID_PASSWORD_EMAILID.message,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }

    return new SuccessResponse('Successfull login', {
      token: jwt.sign(
        { emailId: user.emailId },
        '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb',
      ),
    });
  }

  private async _hashPassword(password: string): Promise<string> {
    const salt = await this._genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async _genSalt(): Promise<string> {
    return await bcrypt.genSalt(12);
  }

  private async _comparePassword(
    password: string,
    user: User,
  ): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  private _sendUnknownException() {
    throw new BadRequestException(
      new ErrorResponse(
        ERROR_CODE.ERR_UNKNOWN.code,
        ERROR_CODE.ERR_UNKNOWN.message,
        HttpStatus.BAD_REQUEST,
      ),
    );
  }
}
