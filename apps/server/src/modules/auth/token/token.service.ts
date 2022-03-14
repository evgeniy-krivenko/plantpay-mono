import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';

const SECONDS_PER_DAY = 86400;
const HOUR = 3600;

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async getCookiesWithJWTAccessToken(payload: TokenPayload, accessToken?: string): Promise<string> {
    const token = accessToken || (await this.getAccessToken(payload));
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${HOUR}`;
  }

  async getCookiesWithJWTRefreshToken(token: string): Promise<string> {
    const maxAge = Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_DAY')) * SECONDS_PER_DAY;
    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${maxAge}`;
  }

  async getAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  async getRefreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }
}
