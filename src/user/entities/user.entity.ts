import { ApiProperty } from "@nestjs/swagger"

export class UserModel {

    @ApiProperty({ description: "user id", type: Number })
    user_id: number

    @ApiProperty()
    full_name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    pass_word: string
}

