import {Body, Controller, Post, HttpCode, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "./dto/create-user.dto";

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @HttpCode(201)
  @Post('/sign-up')
  async signUp(@Body() dto: CreateUserDto): Promise<void> {
    await this.authService.create(dto)
    return;
  }
}
