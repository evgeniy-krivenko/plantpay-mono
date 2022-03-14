import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { tokenExtraction } from '../../../helps/token-extraction';
import { User } from '../user.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: tokenExtraction('Refresh'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  async validate({ email }: Pick<User, 'email'>): Promise<string> {
    return email;
  }
}
