import { SignInService } from './../application/sign-in.service';
import { RegisterUserResponse } from './../application/dto/register-user.dto';
import { ApiResponse } from './../../common/dto/CommonResponseDto';
import { RegisterUserRequest } from 'src/user/application/dto/register-user.dto';
import { RegisterUserService } from './../application/register-user.service';
import { Body, Controller, Post } from "@nestjs/common";
import { SignInRequest, SignInResponse } from '../application/dto/sign-in.dto';

@Controller()
export class UserController {
    constructor(private readonly registerUserService: RegisterUserService, private readonly signInService: SignInService) {}

    @Post("users")
    async register(@Body() req: RegisterUserRequest): Promise<ApiResponse<RegisterUserResponse>> {
        const response = await this.registerUserService.register(req)

        return ApiResponse.success(response)
    }

    @Post("auth/signin")
    async signIn(@Body() req: SignInRequest): Promise<ApiResponse<SignInResponse>> {
        const response = await this.signInService.signIn(req)

        return ApiResponse.success(response)
    }
}