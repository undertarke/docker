import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule,
    JwtModule.register({ global: true })
  ],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule { }

// decorator 