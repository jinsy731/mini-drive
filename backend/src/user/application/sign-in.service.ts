import { SignInRequest, SignInResponse } from './dto/sign-in.dto';
import { PrismaUserRepository } from './../adaptor/prisma.user.repository';
import { AuthService } from 'src/common/auth/auth.service';
import { Injectable } from "@nestjs/common";
import { User } from '../domain/user.model';

@Injectable()
export class SignInService {
    constructor(private readonly authService: AuthService, private readonly userRepository: PrismaUserRepository) {}

    async signIn(req: SignInRequest): Promise<SignInResponse> {
        const model = await this.userRepository.findUnique({email: req.email})

        const user = new User(model)
        await user.authenticate(req.password)

        return await this.authService.issueJWT(user)
    }
}