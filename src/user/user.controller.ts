import { Body, Controller, Delete, Get, HttpException, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
// import { user } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { nguoi_dung } from '@prisma/client';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserModel } from './entities/user.entity';
import { FileUploadDto } from './dto/user.dto';

// prisma
// yarn add prisma @prisma/client
// yarn prisma init
// sửa lại chuỗi kết nối CSDL
// yarn prisma db pull
// yarn prisma generate

// localhost:8080/user/get-user
@ApiTags("user")
@Controller('/user')
export class UserController {
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ) { }

    // yarn add -D @types/multer
    // interceptor


    @Post("/demo/:id")
    demo(@Param("id") id: string, @Body() body: UserModel) {

        return "demo"
    }


    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: FileUploadDto,
        description: "Upload avatar"
    })
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: process.cwd() + "/public/imgs",
            filename: (req, file, callback) => callback(null, Date.now() + "_" + file.originalname)
        })
    }))
    @Post("/upload-avatar/:userId")
    uploadAvatar(
        @UploadedFile() file: Express.Multer.File,
        @Param("userId") userId: string
    ) {


        return this.userService.uploadAvatar(userId, file);
    }

    @Get("/get-user")
    getUser(): Promise<nguoi_dung[]> {
        return this.userService.getUser();
    }

    @Get("/get-env")
    getEnv(): string {
        let dataEnv: string = this.configService.get("TITLE");
        return dataEnv;
    }

    @Delete("/:userId")
    removeUser(@Param("userId") userId: string):Promise<string> {
        // try {

            return this.userService.removeUser(userId);
        // } catch {
        //     throw new HttpException("Lỗi BE", 500);
        // }
    }

}
