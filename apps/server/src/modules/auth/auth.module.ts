import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@plantpay-mono/prisma';
import { UserRepository } from './repository/user.repository';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '../../configs/jwt.config';
import { TokenService } from './token/token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RoleGuard } from './guards/role.guard';
import { RoleRepository } from './repository/role.repository';
import { JwtAccessGuard } from './guards/jwt-access.guard';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [
    UserRepository,
    RoleRepository,
    AuthService,
    TokenService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    RoleGuard,
    JwtAccessGuard,
  ],
  exports: [RoleGuard, JwtAccessGuard],
})
export class AuthModule {}
