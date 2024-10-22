import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), ProductModule,
    AuthModule,
    JwtModule.register({
      global: true
    }),
    PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
