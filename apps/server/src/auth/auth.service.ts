import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token/token.service';
import { SignIn } from './types/sign-in.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    const user = new User(dto.name, dto.email);
    await user.setPassword(dto.password, 5);
    await this.userRepository.create(user);
  }

  async signIn({ email, password }: SignInUserDto): Promise<SignIn> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const payload = { email: user.email };
    const accessJWTCookies = await this.tokenService.getCookiesWithJWTAccessToken(payload);
    const { refreshJWTCookies, token } = await this.tokenService.getCookiesWithJWTRefreshToken(payload);
    user.setHashedToken(token, 10);
    await this.userRepository.updateToken(user);
    return {
      accessJWTCookies,
      refreshJWTCookies,
      user: {
        email: user.email,
        name: user.name,
        isVendor: user.isVendor,
      },
    };
  }
}
