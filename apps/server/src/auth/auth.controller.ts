import { Body, Controller, Post, HttpCode, UsePipes, ValidationPipe, Res, Get, UseGuards, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserEmail } from './decorators/user-email.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { TokenService } from './token/token.service';
import { User } from './user.entity';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) {}

  @HttpCode(201)
  @Post('/sign-up')
  async signUp(@Body() dto: CreateUserDto): Promise<void> {
    return this.authService.signUp(dto);
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
}
