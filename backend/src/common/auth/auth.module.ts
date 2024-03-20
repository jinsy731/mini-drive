import { PrismaService } from './../db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaRefreshTokenRepository } from 'src/common/auth/prisma.refresh-token.repository';
import { AuthService } from 'src/common/auth/auth.service';
import { Module } from "@nestjs/common";

@Module({
    providers: [
        JwtService,
        AuthService,
        PrismaService,
        PrismaRefreshTokenRepository,
    ],
    exports: [
        AuthService,
        JwtService,
        PrismaRefreshTokenRepository,
        PrismaService
    ]
})
export class AuthModule {}