import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '@prisma/client';
import { UserRepository } from '../repository/user.repository';

/**
 * Guard checks user's roles for endpoint
 * Should place after passport-js strategy jwt-access
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const { user: email } = context.switchToHttp().getRequest();
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }
    return user.hasRoles(roles);
  }
}
