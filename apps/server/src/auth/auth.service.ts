import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private readonly configService: ConfigService) {}

  async signUp(dto: CreateUserDto): Promise<void> {
    const user = new User(dto.name, dto.email);
    await user.setPassword(dto.password, 5);
    await this.userRepository.create(user);
  }

  async signIn({ email, password }: SignInUserDto, token: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const salt = Number(this.configService.get('SALT'));
    user.setHashedToken(token, salt);
    await this.userRepository.updateToken(user);
    return user;
  }

  async refresh(email: string, refreshToken: string, newRefreshToken: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Такой пользователь отсутствует');
    }
    const isValidToken = await user.isValidToken(refreshToken);
    if (!isValidToken) {
      throw new UnauthorizedException('Токен был использован ранее');
    }
    const salt = Number(this.configService.get('SALT'));
    user.setHashedToken(newRefreshToken, salt);
    await this.userRepository.updateToken(user);
  }
}
