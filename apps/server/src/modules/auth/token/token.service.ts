import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';

const SECONDS_PER_DAY = 86400;
const HOUR = 3600;

@Injectable({ scope: Scope.REQUEST })
export class TokenService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async getCookiesWithJWTAccessToken(payload: TokenPayload, accessToken?: string): Promise<string> {
    const token = accessToken || this.getAccessToken(payload);
    const maxAge = Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_DAY')) * SECONDS_PER_DAY;
    return `Access-token=${token}; Path=/; samesite=lax; Max-Age=${maxAge};`;
  }

  async getCookiesWithJWTRefreshToken(token: string): Promise<string> {
    const maxAge = Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_DAY')) * SECONDS_PER_DAY;
    return `Refresh-token=${token}; HttpOnly; Path=/; samesite=lax; Max-Age=${maxAge}`;
  }

  getAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  getRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }

  public async decodeEmailConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
