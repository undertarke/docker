import { Body, Controller, Get, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ApiBody, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

class Person {

  @ApiProperty({ description: "id", type: Number })
  id: number;

  @ApiProperty({ description: "hoTen", type: String })
  hoTen: string;

  @ApiProperty({ description: "email", type: String })
  email: string;
}

// localhost:8080/app/get-title
@ApiTags("app")
@Controller("/app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  //@ApiParam({ name: "name" })
  // @ApiBody({ type: Person })
  @Post("/demo/:name")
  getDemo(@Req() req: Request, @Param("name") id: number, @Body() Body: Person) {
    // let { id } = req.params;

    return "hello";
  }


  // khởi tạo API
  // request
  @Get("/get-title/:idParam")
  @HttpCode(200) // => res.status
  getTitle(@Req() request: Request, @Query("idQuery") idQuery: string, @Param("idParam") idParam: string, @Body() body): string {
    // let { idQuery } = request.query; // /get-title?idQuery="node 29"
    // let { idParam } = request.params; // /get-title/node 29
    let { id, hoTen, email } = body;


    // req.query
    // req.params
    // req.body

    return idParam; // => res.send
  }

  @Get("/get-total")
  getHello(): number {
    let number: number = 1;
    let numberTwo: number = 2;
    return this.appService.getTotal(number, numberTwo);
  }

}
