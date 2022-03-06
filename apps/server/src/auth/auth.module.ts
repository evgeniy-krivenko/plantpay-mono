import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {UserRepository} from "./repository/user.repository";
import {AuthService} from "./auth.service";

@Module({
  controllers: [AuthController],
  imports: [PrismaModule],
  providers: [UserRepository, AuthService]
})
export class AuthModule {}
