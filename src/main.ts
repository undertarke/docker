import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // module goc

  app.enableCors()// origin: *

  const config = new DocumentBuilder().setTitle("Swagger").build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/swagger",app,document)

  await app.listen(8080);
}
bootstrap();

// 0906935483

// 3 module => doi tuong
// 1: controller => tao API
// 2: service => xu ly logic
// 3: module => ket noi controller voi service, ket noi den cac module cua doi tuong khac

