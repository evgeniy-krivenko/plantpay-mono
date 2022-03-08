import { Body, Controller, Post, HttpCode, UsePipes, ValidationPipe, Res, Get, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { User } from './user.entity';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('/sign-up')
  async signUp(@Body() dto: CreateUserDto): Promise<void> {
    return this.authService.create(dto);
  }

  @HttpCode(200)
  @Post('/sign-in')
  async signIn(@Body() dto: SignInUserDto, @Res({ passthrough: true }) response: Response): Promise<Partial<User>> {
    const { accessJWTCookies, refreshJWTCookies, user } = await this.authService.signIn(dto);
    response.setHeader('Set-Cookie', [accessJWTCookies, refreshJWTCookies]);
    return user;
  }

  @UseGuards(JwtAccessGuard)
  @Get('/test')
  test() {
    return { message: 'Hello world' };
  }
}
