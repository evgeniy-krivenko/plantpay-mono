import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../user.entity';
import { UserMapper } from './user.mapper';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository {
  constructor(private readonly prismaServise: PrismaService) {}

  async create(user: User): Promise<User> {
    const { email, name, password, isVendor } = user;
    const createdUser = await this.prismaServise.userModel.create({
      data: {
        email,
        name,
        password,
        isVendor,
      },
    });
    return UserMapper.mapToDomain(createdUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await this.prismaServise.userModel.findUnique({ where: { email } });
    if (!userModel) {
      return null;
    }
    const userRoles = await this.prismaServise.roleModel.findMany({ where: { id: userModel.id } });
    return UserMapper.mapToDomain(userModel, userRoles);
  }

  async updateToken(user: User): Promise<void> {
    this.prismaServise.userModel.update({ where: { email: user.email }, data: { hashedToken: user.hashedToken } });
  }
}
