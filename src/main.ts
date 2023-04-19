import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder().setTitle("Swagger title").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document); // => localhost:8080/swagger
  
  
  app.enableCors();
  app.use(express.static("."));
  await app.listen(8080);
}
bootstrap();
// yarn start:dev => nodemon

//yarn add @nestjs/swagger swagger-ui-express