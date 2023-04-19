import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, nguoi_dung } from '@prisma/client';
import { UserDto } from './Dto/user.dto';

@Injectable()
export class UserService {

    prisma = new PrismaClient();

    async getUser(): Promise<nguoi_dung[]> {
        return await this.prisma.nguoi_dung.findMany();
    }

    async saveAvatar(userId: string, imgName: string) {
        let data = await this.prisma.nguoi_dung.findFirst({
            where: {
                id: Number(userId)
            }
        })

        data.hinh_dai_dien = imgName;
        await this.prisma.nguoi_dung.update({
            data, where: {
                id: Number(userId)
            }
        })

        return "Upload thành công !";
    }
}
