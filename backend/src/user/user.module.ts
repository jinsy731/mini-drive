import { SignInService } from './application/sign-in.service';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/common/auth/auth.service';
import { UserController } from './adaptor/user.controller';
import { PrismaUserRepository } from './adaptor/prisma.user.repository';
import { CreateUserPort } from 'src/user/application/port/create-user.port';
import { AuthModule } from './../common/auth/auth.module';
import { RegisterUserService } from './application/register-user.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [AuthModule],
    controllers: [UserController],
    providers: [
        AuthService,
        RegisterUserService,
        SignInService,
        PrismaUserRepository,
    ]
})
export class UserModule {}
