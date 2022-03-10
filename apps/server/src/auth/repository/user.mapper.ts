import { RoleModel, UserModel } from '@prisma/client';
import { Role } from '../role.entity';
import { User } from '../user.entity';

export class UserMapper {
  static mapToDomain(userModel: UserModel, roles?: RoleModel[]): User {
    return new User(
      userModel.name,
      userModel.email,
      userModel.isVendor,
      userModel.password,
      userModel.id,
      userModel.hashedToken,
      userModel.createdAt,
      userModel.updatedAt,
      RoleMapper.mapToDomain(roles),
    );
  }

  static mapToModel(user: User): UserModel {
    return {
      name: user.name,
      email: user.email,
      id: user.id,
      hashedToken: user.hashedToken,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isVendor: user.isVendor,
    };
  }
}

export class RoleMapper {
  static mapToDomain(roles: RoleModel[]): Role[] {
    return roles.map((role) => new Role(role.id, role.value, role.description));
  }
}
