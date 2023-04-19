import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { nguoi_dung } from '@prisma/client';
import { userLogin } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ) { }

  login(userLogin: userLogin) {
    // check email
    // check pass_word

    // login thành công

    let token = this.jwtService.sign({ data: "node 29" }, { secret: this.config.get("SECRET_KEY"), expiresIn: "5m" });

    return token;

    //login thất bại
  }

  signUp(user: nguoi_dung) {

    // check email, sdt trùng
    // thêm user. prisma.create({data:user});
    return "sign up";
  }
}
