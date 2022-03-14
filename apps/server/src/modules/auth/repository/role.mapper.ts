import { RoleModel } from '@prisma/client';
import { Role } from '../role.entity';

export class RoleMapper {
  static mapToDomainRoles(roles: RoleModel[]): Role[] {
    if (!roles) {
      return [];
    }
    return roles.map((role) => new Role(role.value, role.description, role.id));
  }

  static mapToDomainRole(role: RoleModel): Role {
    return new Role(role.value, role.description, role.id);
  }
}
