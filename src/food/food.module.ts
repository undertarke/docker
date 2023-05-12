import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule {}
