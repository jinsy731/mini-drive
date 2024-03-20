import { TokenStatus } from '@prisma/client';
import { v4 as uuid } from "uuid"
import { User } from "src/user/domain/user.model"
import { Inject, Injectable } from "@nestjs/common"
import authConfig from "src/config/authConfig"
import { ConfigType } from "@nestjs/config"
import { JWTTokenExpiredException } from "./auth.exception"
import { JwtService } from "@nestjs/jwt"
import { AuthToken } from "./auth-token.model"
import { RefreshToken } from "./refresh-token.model"
import { check } from '../exception/ValidationUtils';
import { PrismaRefreshTokenRepository } from './prisma.refresh-token.repository';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        @Inject(authConfig.KEY) private readonly config: ConfigType<typeof authConfig>,
        private readonly jwtService: JwtService,
        private readonly refreshTokenRepository: PrismaRefreshTokenRepository
    ) {}

    async issueJWT(user: User): Promise<AuthToken> {
        const refreshToken = this.createRefreshToken(user)
        const decodedRefreshToken = this.jwtService.decode(refreshToken, { json: true })
        
        const model = new RefreshToken({
            jti: decodedRefreshToken["jti"],
            payload: refreshToken,
            userId: user.id,
            status: TokenStatus.USE
        })

        await this.refreshTokenRepository.upsert(model)
        
        return new AuthToken(this.createAccessToken(user), refreshToken)
    }

    createAccessToken(user: Omit<User, "passwd">): string {
        return this.jwtService.sign({
            id: user.id,
            name: user.name,
            email : user.email
        }, {
            secret: this.config.jwtSecret,
            expiresIn: this.config.expiresIn,
            audience: "mini-drive.io",
            issuer: "Mini Drive",
            algorithm: "HS256"
        })
    }

    createRefreshToken(user: Omit<User, "passwd">): string {
        return this.jwtService.sign({
            id: user.id,
            name: user.name,
            email : user.email
        }, {
            secret: this.config.jwtSecret,
            expiresIn: this.config.refreshExpiresIn,
            audience: "mini-drive.io",
            issuer: "Mini Drive",
            algorithm: "HS256",
            jwtid: uuid()
        })
    }

    verify(token: string): any {
        try {
            return this.jwtService.verify(token, {
                algorithms: ["HS256"],
                secret: this.config.jwtSecret
            })
        } catch(err) {
            throw new JWTTokenExpiredException()
        }
    }

    async refresh(refreshToken: string): Promise<AuthToken> {
        const decoded = this.verify(refreshToken)
        const model = await this.refreshTokenRepository.findUnique({
            where: {jti: decoded["jti"]}
        })

        check(model != null, "RefreshToken doesn't exist")
        check(model.status == "USE", "RefreshToken is unavailable")

        return this.issueJWT(new User({
            id: decoded["id"],
            email: decoded["email"],
            name: decoded["name"]
        }))
    }

    async hash(plainText: string): Promise<string> {
        return bcrypt.hash(plainText, 10)
    }
}