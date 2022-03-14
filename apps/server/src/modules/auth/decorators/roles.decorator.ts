import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleType } from '@prisma/client';

export const Roles = (...roles: RoleType[]): CustomDecorator<string> => SetMetadata('roles', roles);
