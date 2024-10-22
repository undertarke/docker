import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  SwaggerModule.setup("/swagger", app, SwaggerModule.createDocument(app, new DocumentBuilder().setTitle("NesJS bài tập").build()))

  await app.listen(8080);
}
bootstrap();
