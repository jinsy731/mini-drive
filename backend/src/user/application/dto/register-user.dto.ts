import { IsEmail, Length, Matches, max, min } from "@nestjs/class-validator"

export class RegisterUserRequest {
    @Length(3, 50)
    name: string

    @Length(5, 254)
    @IsEmail()
    email: string

    @Matches(RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$'), 
        { message: "비밀번호는 영어 대소문자, 숫자, 특수문자를 포함하여 12자 이상이어야 합니다."}
    )
    passwd: string

    constructor(name: string, email: string, passwd: string) {
        this.name = name
        this.email = email
        this.passwd = passwd
    }
}

export class RegisterUserResponse {
    accessToken: string
    refreshToken: string
}