import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { nguoi_dung } from '@prisma/client';
import { UserLogin } from './entities/auth.entity';
import { ApiTags } from '@nestjs/swagger';

// yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt

// localhost:8080/auth/login

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // yarn prisma db pull
  // yarn prims generate


  @Post("/login")
  login(@Body() userLogin: UserLogin): Promise<string> {
    return this.authService.login(userLogin);
  }

  @Post()
  signUp(@Body() body: nguoi_dung): string {

    return this.authService.signUp(body);
  }

}
