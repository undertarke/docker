import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enabled CORS 
  app.enableCors();
  app.use(express.static(".")) // định vị đường dẫn để load tài nguyên

  // swagger
  //yarn add @nestjs/swagger swagger-ui-express
  const config = new DocumentBuilder().setTitle("Swagger NestJs").setVersion("113").setDescription("đây là description").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document); // => localhost:8080/swagger

  await app.listen(8080);
}
bootstrap();




// yarn start => ko nodemon
// yarn start:dev => có nodemon
// module:     nest g module [tên đối tượng]
// controller: nest g controller [tên đối tượng] --no-spec
// service:    nest g service [tên đối tượng] --no-spec

// tạo nhanh 3 modules: nest g resource [tên đối tượng] --no-spec

// yarn add @nestjs/config