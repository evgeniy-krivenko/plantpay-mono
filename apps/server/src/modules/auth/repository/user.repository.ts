import { Injectable } from '@nestjs/common';
import { RoleType } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaServise: PrismaService) {}

  async create(user: User): Promise<User> {
    const { email, name, password, isVendor } = user;
    const role = user.getRoleByType(RoleType.BYIER);
    const userModel = await this.prismaServise.userModel.create({
      data: {
        email,
        name,
        password,
        isVendor,
        roles: {
          create: {
            role: {
              connect: { id: role.id },
            },
          },
        },
      },
    });
    return UserMapper.mapToDomain(userModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await this.prismaServise.userModel.findUnique({ where: { email } });
    if (!userModel) {
      return null;
    }
    const userRoles = await this.prismaServise.roleModel.findMany({
      where: { users: { some: { userId: userModel.id } } },
    });
    return UserMapper.mapToDomain(userModel, userRoles);
  }

  async updateToken(user: User): Promise<void> {
    this.prismaServise.userModel.update({ where: { email: user.email }, data: { hashedToken: user.hashedToken } });
  }

  async updateRoles(user: User): Promise<void> {
    const rolesIds = user.getAllRolesIds();
    const dataForCreate = rolesIds.map((roleId) => ({ roleId }));
    this.prismaServise.userModel.update({
      where: {
        email: user.email,
      },
      data: {
        roles: {
          createMany: {
            data: dataForCreate,
            skipDuplicates: true,
          },
        },
      },
    });
  }
}
