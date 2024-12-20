import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

class UserType {
  @ApiProperty()
  id: number
  @ApiProperty()
  userName: string
  @ApiProperty()
  pass: string
}

@ApiTags("app")
@Controller("/app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get() // method: GET => endpoint /
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiQuery({
    name: "name",
    type: String
  })
  @ApiParam({
    name: "name2",
    type: String
  })
  @ApiBody({
    type: UserType
  })
  @Post("/demo/:name2/:email2") // method: GET => endpoint /
  getDemo(@Req() req,
    // @Query("name") name: string,
    // @Query("email") email: string,
    // @Param("name2") name2: string,
    // @Param("email2") email2: string,

    // @Body() body: UserType,

  ) {
    // request
    // url
    // + query params (query string): /demo?name=abc&email=a@gmail.com
    let { name, email } = req.query
    // // + route params: /demo/abc/a@gmail.com
    let { name2, email2 } = req.params



    // body (json)
    let { id, userName, pass } = req.body

    return { name, email, name2, email2, id, userName, pass }
  }


}


// DAO: Data access object
// DTO: Data Transfer object
// Entities: object

// yarn add prisma @prisma/client
// B1: yarn prisma init
// B2: update file .env & schema.prisma
// B3: yarn prisma db pull
// B4: yarn prisma generate
