import { IsJWT } from 'class-validator';
import { authException } from '@plantpay-mono/constants';

export class ConfirmEmailDto {
  @IsJWT({ message: authException.TOKEN_INCORRECT })
  token: string;
}
