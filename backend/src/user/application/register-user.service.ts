import { PrismaUserRepository } from './../adaptor/prisma.user.repository';
import { AuthService } from 'src/common/auth/auth.service';
import { Inject, Injectable } from "@nestjs/common";
import { User } from "../domain/user.model";
import { RegisterUserRequest } from "./dto/register-user.dto";
import { CreateUserPort } from "./port/create-user.port";
import { AuthToken } from 'src/common/auth/auth-token.model';
import { check } from 'src/common/exception/ValidationUtils';

@Injectable()
export class RegisterUserService {
    constructor(private readonly userRepository: PrismaUserRepository, private readonly authService: AuthService) {}

    async register(req: RegisterUserRequest): Promise<AuthToken> {
        const user = await User.create(req.email, req.name, await this.authService.hash(req.passwd))

        check(!await this.userRepository.exists({email: req.email}), "Email is already in use.")

        const savedUser = await this.userRepository.save(user)

        return this.authService.issueJWT(savedUser)
    }
}