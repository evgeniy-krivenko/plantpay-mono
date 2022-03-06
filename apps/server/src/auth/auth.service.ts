import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async create(dto: CreateUserDto) {
    const user = new User(dto.name, dto.email);
    await user.setPassword(dto.password, 5)
    const { name, id, email, isVendor } = await this.userRepository.create(user)
    return { id, name, email, isVendor }
  }
}
