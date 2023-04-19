import { ApiProperty } from "@nestjs/swagger";

export interface UserDto {

    user_id: number;
    full_name: string;
    email: string;
    pass_word: string;

}

export type userTypeDto = {
    token: string,
    dateLogin: string
}

export type fileDto = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}

export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    fileUpload: any;
}