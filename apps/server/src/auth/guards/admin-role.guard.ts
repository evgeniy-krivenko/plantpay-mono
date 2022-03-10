import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email } = context.switchToHttp().getRequest();
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }
    return isAdmin;
  }
}
