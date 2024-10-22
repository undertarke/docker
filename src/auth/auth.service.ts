import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService

  ) { }

  login(user) {

    // 

    return this.jwtService.signAsync({ userId: 1 }, { expiresIn: "15m", secret:"BAI_MAT" })
  }

  signUp(user) {

    // 
    return `This action returns all auth`;
  }

}
