import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';


// typescript
// OOP
// + Lớp đối tượng, đối tượng
// const appService = new AppService();
// biến (variable), hàm (function)(
// thuộc tính (properties), phương thức (method), this
// hàm khởi tạo constructor(){}
// từ khóa dẫn xuất (private, protected, public)

// Decorator
// /user/get-user => Path = EndPoint

// localhost:8080/app/...

// interface
// DTO
type bodyApp = {
  email: string,
  password: string
}

@ApiTags("app")
@Controller("/app")
export class AppController {

  constructor(private appService: AppService) { }

  // lấy bằng url: 
  //    + query string: localhost:8080?id=1&hoTen=abc
  //    + query params (/:id/:hoTen): localhost:8080/1/abc
  // lấy bằng jsson: body
  // lấy bằng headers

  // http://localhost:8080/app/hello/1/abc?id=2&hoTen=xyz
  @HttpCode(202)
  @Get("/hello/:id2/:hoTen2")
  getHello(
    @Req() req: Request,
    @Query("id") id: string,
    @Query("hoTen") hoTen: string,
    @Param("id2") id2: string,
    @Param("hoTen2") hoTen2: string,
    @Body() body: bodyApp,
    @Headers("token") headers
  ) {

    // let { id, hoTen } = req.query;
    // let { id2, hoTen2 } = req.params;
    // let { email, password } = req.body;

    let { email, password } = body;

    return `${email} - ${password}`;

  }

  @Post("/demo")
  getDemo(): number {
    let numberOne: number = 3;
    let numberTwo: number = 4;
    return this.appService.getDemo(numberOne, numberTwo);

  }
}
