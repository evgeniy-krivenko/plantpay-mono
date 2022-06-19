import { RoleModel, UserModel } from '@prisma/client';
import { User } from '../user.entity';
import { RoleMapper } from './role.mapper';

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
      RoleMapper.mapToDomainRoles(roles),
      userModel.isEmailConfirmed,
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
      isEmailConfirmed: user.isEmailConfirmed,
    };
  }
}
