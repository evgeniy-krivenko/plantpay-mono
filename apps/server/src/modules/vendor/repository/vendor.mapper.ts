import { RoleModel, UserModel, UsersOnRoles } from '@prisma/client';
import { RoleMapper } from '../../auth/repository/role.mapper';
import { Vendor } from '../vendor.entiry';

export type RolesPrismaType = {
  role: RoleModel;
};

export type UserWithRoles = UserModel & {
  roles?: RolesPrismaType[];
};

export class VendorMapper {
  static mapToDomain(userModel: UserWithRoles): Vendor {
    const roles = userModel.roles?.map((role) => role.role);
    return new Vendor({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
      roles: RoleMapper.mapToDomainRoles(roles),
    });
  }
}
