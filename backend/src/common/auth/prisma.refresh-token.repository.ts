import { PrismaService } from '../db/prisma.service';
import { Injectable } from "@nestjs/common";
import { RefreshToken } from "src/common/auth/refresh-token.model";
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaRefreshTokenRepository {
    constructor(private readonly prisamService: PrismaService) {}

    async upsert(refreshToken: RefreshToken) {
        await this.prisamService.refreshToken.upsert({
            where: { jti: refreshToken.jti },
            create: { ...refreshToken },
            update: { ...refreshToken }
        })
    }

    async findUnique(whereQuery: Prisma.RefreshTokenFindUniqueArgs) {
        return await this.prisamService.refreshToken.findUnique(whereQuery)
    }
}