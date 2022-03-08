import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenAndCookies, TokenPayload } from './token-payload.interface';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async getCookiesWithJWTAccessToken(payload: TokenPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  async getCookiesWithJWTRefreshToken(payload: TokenPayload): Promise<RefreshTokenAndCookies> {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    const refreshJWTCookies = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      token,
      refreshJWTCookies,
    };
  }
}
