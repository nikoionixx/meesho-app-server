import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  emailId: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export class SignAuthDto {
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsNotEmpty({ message: 'EmailId is required' })
  @IsEmail()
  emailId: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Phone Number is required' })
  phoneNumber: string;
}
