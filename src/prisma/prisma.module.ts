import { Global, Module } from '@nestjs/common';
import { PrismaPostgreService, PrismaMySQLService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaPostgreService, PrismaMySQLService],
    exports: [PrismaPostgreService, PrismaMySQLService]
})
export class PrismaModule { }
