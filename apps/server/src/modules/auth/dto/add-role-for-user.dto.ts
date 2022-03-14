import { dto } from '@plantpay-mono/constants';
import { RoleType } from '@prisma/client';
import { IsEmail, IsEnum } from 'class-validator';

export class AddRoleForUserDto {
  @IsEmail({}, { message: dto.MUST_BE_EMAIL })
  email: string;
  @IsEnum(RoleType, { message: dto.WRONG_ROLE_TYPE })
  role: RoleType;
}
