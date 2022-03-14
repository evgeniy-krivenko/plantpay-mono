import { dto } from '@plantpay-mono/constants';
import { IsEmail, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: dto.INVALID_FORMAT })
  @MaxLength(30, { message: dto.maxLengthMessage(30) })
  @MinLength(2, { message: dto.minLengthMessage(2) })
  name: string;
  @IsEmail({}, { message: dto.MUST_BE_EMAIL })
  email: string;
  @Length(8, 20, { message: dto.passLenMsg(8, 20) })
  @IsString()
  password: string;
}
