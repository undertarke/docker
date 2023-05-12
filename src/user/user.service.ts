import { Injectable } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import * as fs from 'fs'; // file system


@Injectable()
export class UserService {
    private prisma = new PrismaClient();

    async getUser(): Promise<nguoi_dung[]> {
        let data: nguoi_dung[] = await this.prisma.nguoi_dung.findMany();

        return data;
    }

    async uploadAvatar(userId: string, file: Express.Multer.File) {

        // lấy thông user muốn lưu theo user id
        let getUserId = await this.prisma.nguoi_dung.findFirst({
            where: {
                id: Number(userId)
            }
        })

        // set avatar mới
        getUserId.hinh_dai_dien = file.filename;

        // gọi truy vấn lưu hình
        await this.prisma.nguoi_dung.update({
            data: getUserId, where: {
                id: Number(userId)
            }
        })

        return "Upload thành công";
    }

    async removeUser(userId: string): Promise<string> {

        let getNguoiDung = await this.prisma.nguoi_dung.findFirst({ where: { id: Number(userId) } });

        if (getNguoiDung) {
            let { hinh_dai_dien } = getNguoiDung;

            let urlImage = process.cwd() + "/public/imgs/" + hinh_dai_dien;

            console.log(urlImage);
            // check hình và xóa
            fs.unlink(urlImage, (err) => { });

            // xóa user
            await this.prisma.nguoi_dung.delete({ where: { id: Number(userId) } });
            return "Xóa user thành công";

        }


        return "Không tìm thấy user";
    }
}
