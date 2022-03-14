import { Injectable } from '@nestjs/common';
import { RoleType } from '@prisma/client';
import { PrismaService } from '@plantpay-mono/prisma';
import { Role } from '../role.entity';
import { RoleMapper } from './role.mapper';

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaServise: PrismaService) {}

  async getRolesByUserId(userId: number): Promise<Role[]> {
    const roles = await this.prismaServise.roleModel.findMany({
      where: { users: { every: { userId } } },
    });
    return RoleMapper.mapToDomainRoles(roles);
  }

  async getRoleByType(type: RoleType): Promise<Role> {
    const role = await this.prismaServise.roleModel.findFirst({ where: { value: type } });
    return RoleMapper.mapToDomainRole(role);
  }
}
