import { dto } from '@plantpay-mono/constants';
import { IsEmail, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { ISignUp } from '@plantpay-mono/types';

export class CreateUserDto implements ISignUp {
  @IsString({ message: dto.INVALID_FORMAT })
  @MaxLength(30, { message: dto.maxLengthMessage(30) })
  @MinLength(2, { message: dto.minLengthMessage(2) })
  name: string;
  @IsString({ message: dto.INVALID_FORMAT })
  @MaxLength(30, { message: dto.maxLengthMessage(30) })
  @MinLength(2, { message: dto.minLengthMessage(2) })
  surname: string;
  @IsEmail({}, { message: dto.MUST_BE_EMAIL })
  email: string;
  @Length(8, 20, { message: dto.passLenMsg(8, 20) })
  @IsString()
  password: string;
}
