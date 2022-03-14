import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { ConfigService } from '@nestjs/config';
import { RoleType } from '@prisma/client';
import { RoleRepository } from './repository/role.repository';
import { AddRoleForUserDto } from './dto/add-role-for-user.dto';
import { authException } from '@plantpay-mono/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<User> {
    const candidate = await this.userRepository.findByEmail(dto.email);
    if (candidate) {
      throw new BadRequestException(authException.USER_IS_EXISTS);
    }
    const user = new User(dto.name, dto.email);
    await user.setPassword(dto.password, 5);
    const role = await this.roleRepository.getRoleByType(RoleType.BYIER);
    user.addRole(role);
    await this.userRepository.create(user);
    return user;
  }

  async signIn({ email, password }: SignInUserDto, token: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(authException.INCORRECT_CREDENTIALS);
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedException(authException.INCORRECT_CREDENTIALS);
    }
    const salt = Number(this.configService.get('SALT'));
    user.setHashedToken(token, salt);
    await this.userRepository.updateToken(user);
    return user;
  }

  async refresh(email: string, refreshToken: string, newRefreshToken: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(authException.USER_IS_NOT_EXISTS);
    }
    const isValidToken = await user.isValidToken(refreshToken);
    if (!isValidToken) {
      throw new UnauthorizedException(authException.TOKEN_HAS_BEEN_USED);
    }
    const salt = Number(this.configService.get('SALT'));
    user.setHashedToken(newRefreshToken, salt);
    await this.userRepository.updateToken(user);
  }

  async addRoleForUser({ email, role: roleType }: AddRoleForUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException(authException.USER_IS_NOT_EXISTS);
    }
    const role = await this.roleRepository.getRoleByType(roleType);
    user.addRole(role);
    this.userRepository.updateRoles(user);
    return user;
  }
}
