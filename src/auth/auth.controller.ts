import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  @Get("/login")
  login(@Body() user) {
    return this.authService.login(user);
  }

  @Post("/sign-up")
  signUp(@Body() user) {
    return this.authService.signUp(user);
  }

}
