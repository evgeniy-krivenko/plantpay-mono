import { UserModel } from '@prisma/client';
import { User } from '../user.entity';

export class UserMapper {
  static mapToDomain(userModel: UserModel): User {
    return new User(
      userModel.name,
      userModel.email,
      userModel.isVendor,
      userModel.password,
      userModel.id,
      userModel.hashedToken,
    );
  }
}
