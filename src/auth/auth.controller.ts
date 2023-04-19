import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { nguoi_dung } from '@prisma/client';
import { userLogin } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() body: userLogin) {
    return this.authService.login(body);
  }

  @Post("/sign-up")
  signUp(@Body() body: nguoi_dung) {
    return this.authService.signUp(body);

  }
}

//yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt
