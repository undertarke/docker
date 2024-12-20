import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private jwtService: JwtService

  ) { }

  @Post("/login")
  login() {
    // username, password

    let token = this.jwtService.signAsync({ data: "hello" }, {
      algorithm: "HS256", secret: "BI_MAT", expiresIn: "5m"
    })


    // this.jwtService.verify("token", { secret: "BI_MAT" })

    return token
  }




}
