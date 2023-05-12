import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { PrismaClient, nguoi_dung } from '@prisma/client';
import { UserLogin } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService, // jsonwebtoken
    private configService: ConfigService
  ) {

  }

  private prisma = new PrismaClient();

  async login(userLogin: UserLogin): Promise<string> {

    // check email
    let { email, password } = userLogin;
    let checkUser = await this.prisma.nguoi_dung.findFirst({
      where: {
        email
      }
    })
    if (checkUser) {
      // check pass
      if (checkUser.mat_khau == password) {
        // tạo token
        let token = this.jwtService.signAsync({ data: checkUser }, { expiresIn: "5m", secret: this.configService.get("SECRET_KEY") });

        // trả token
        return token;

      } else {
        // return "Mật khẩu không đúng";
        throw new HttpException("Mật khẩu không đúng", HttpStatus.NOT_FOUND);
        // throw new NotFoundException("Mật khẩu không đúng");

      }

    } else {
      // return "Email không đúng";
      throw new HttpException("Email không đúng", HttpStatus.NOT_FOUND);

    }

  }

  signUp(nguoiDung: nguoi_dung): string {

    // thêm một dữ liệu vào database
    // check email trùng
    // check dien_thoai
    // mã hóa password

    return "Đăng ký thành công";
  }

}
