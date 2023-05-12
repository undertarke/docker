import { ApiProperty } from "@nestjs/swagger";

export class Auth { }
export class UserLogin {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}