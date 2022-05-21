import { IsEmail, IsString, Length } from 'class-validator';
import { ISignIn } from '@plantpay-mono/types';

export class SignInUserDto implements ISignIn {
  @IsEmail({}, { message: 'field must be email' })
  email: string;
  @Length(8, 20, { message: 'Pass should be between 8 and 20 symbol' })
  @IsString({ message: 'Invalid format' })
  password: string;
}
