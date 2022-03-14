import { Body, Controller, Post, HttpCode, UsePipes, ValidationPipe, Res, Get, UseGuards, Req } from '@nestjs/common';
import { IUser } from '@plantpay-mono/types';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { UserEmail } from './decorators/user-email.decorator';
import { AddRoleForUserDto } from './dto/add-role-for-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RoleGuard } from './guards/role.guard';
import { TokenService } from './token/token.service';
import { User } from './user.entity';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

  @HttpCode(201)
  @Post('/sign-up')
  async signUp(@Body() dto: CreateUserDto): Promise<IUser> {
    const { name, email, roles } = await this.authService.signUp(dto);
    return {
      name,
      email,
      roles: roles.map(({ value, description }) => ({ value, description })),
    };
  }

  @HttpCode(200)
  @Post('/sign-in')
  async signIn(@Body() dto: SignInUserDto, @Res({ passthrough: true }) res: Response): Promise<Partial<User>> {
    const payload = { email: dto.email };
    const accessJWTCookies = await this.tokenService.getCookiesWithJWTAccessToken(payload);
    const refreshToken = await this.tokenService.getRefreshToken(payload);
    const refreshJWTCookies = await this.tokenService.getCookiesWithJWTRefreshToken(refreshToken);
    const { email, name, isVendor } = await this.authService.signIn(dto, refreshToken);
    res.setHeader('Set-Cookie', [accessJWTCookies, refreshJWTCookies]);
    return { email, name, isVendor };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  async refresh(@Req() req: Request, @UserEmail() email: string): Promise<void> {
    const refreshToken = req.cookies?.Refresh;
    const accessJWTCookies = await this.tokenService.getCookiesWithJWTAccessToken({ email });
    const newRefreshToken = await this.tokenService.getRefreshToken({ email });
    await this.authService.refresh(email, refreshToken, newRefreshToken);
    req.res.setHeader('Set-Cookie', [accessJWTCookies, newRefreshToken]);
  }

  @Post('/user/role')
  async addRoleForUser(@Body() dto: AddRoleForUserDto): Promise<void> {
    this.authService.addRoleForUser(dto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Get('/test')
  test(): { message: string } {
    return { message: 'ok' };
  }
}