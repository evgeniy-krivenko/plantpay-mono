import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import {User} from "../user.entity";
import {UserMapper} from "./user.mapper";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaServise: PrismaService) {
  }

  async create(user: User): Promise<User> {
    const { email, name, password, isVendor  } = user;
    const createdUser = await this.prismaServise.userModel.create({
      data: {
        email,
        name,
        password,
        isVendor
      }
    });
    return UserMapper.mapToDomain(createdUser);
  }
}
