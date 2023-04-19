import { Body, Controller, Delete, ForbiddenException, Get, Headers, HttpException, HttpStatus, InternalServerErrorException, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileUploadDto, UserDto, fileDto } from './Dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { nguoi_dung } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

// Dto : Data transfer object
// localhost:8080/user
@ApiTags("user")
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private config: ConfigService,
        // private jwtService: JwtService
    ) { }

    // @ApiConsumes('multipart/form-data')
    // @ApiBody({
    //     description: "upload avatar",
    //     type: FileUploadDto
    // })
    // @UseInterceptors(FileInterceptor("fileUpload", {
    //     storage: diskStorage({
    //         destination: process.cwd() + "/public/img",
    //         filename: (req, file, callback) => callback(null, Date.now() + "_" + file.originalname)
    //     })
    // }))
    // @Post("/upload-avatar/:user_id")
    // uploadAva(@Param("user_id") userId: string, @UploadedFile() file: Express.Multer.File) {
    //     try {

    //         return this.userService.saveAvatar(userId, file.filename);
    //     }
    //     catch (err) {
    //         throw new HttpException("Lỗi BE", 500);
    //     }
    // }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    @Get()
    getUser(@Req() req, @Headers("authorization") auth: string): Promise<nguoi_dung[]> | string {
        try {
            let tokenDecode = req.user;

            return this.userService.getUser();
        } catch (err) {
            throw new HttpException("Lỗi BE", HttpStatus.FORBIDDEN);

            //    throw new InternalServerErrorException()
        }

    }

    @Get(":id")
    getUserbyId() {
        return "get user by id"
    }

    @Post()
    createUser() {
        return "create user"
    }
    @Put()
    updateUser() {
        return "update user"
    }
    @Delete()
    removeUser() {
        return "remove user"
    }
}


// yarn add prisma @prisma/client
// yarn prisma init
// thay đổi thông tin kết nối CSDL
// yarn prisma db pull 
// yarn prisma generate