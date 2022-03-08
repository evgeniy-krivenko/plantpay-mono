import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../user.entity';
import { UserMapper } from './user.mapper';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository {
  private user: User;

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
    const userModel = await this.prismaServise.userModel.findFirst({
      where: { email },
    });
    if (!userModel) {
      return null;
    }
    return UserMapper.mapToDomain(userModel);
  }

  async updateToken(user: User): Promise<void> {
    this.prismaServise.userModel.update({ where: { email: user.email }, data: { hashedToken: user.hashedToken } });
  }
}
