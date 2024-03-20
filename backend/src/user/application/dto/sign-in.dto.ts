import { IsNotEmpty } from "@nestjs/class-validator"

export class SignInRequest {
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string
}

export type SignInResponse = {
    accessToken: string
    refreshToken: string
}