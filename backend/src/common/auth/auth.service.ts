import { User } from "src/user/domain/user.model"
import * as jwt from "jsonwebtoken"
import { Inject, Injectable } from "@nestjs/common"
import authConfig from "src/config/authConfig"
import { ConfigType } from "@nestjs/config"
import { JWTTokenExpiredException } from "./auth.exception"

@Injectable()
export class AuthService {
    constructor(@Inject(authConfig.KEY) private readonly config: ConfigType<typeof authConfig>) {}

    issueJWT(user: User): string {
        return jwt.sign({...user}, this.config.jwtSecret, {
            expiresIn: this.config.expiresIn,
            audience: "mini-drive.io",
            issuer: "Mini Drive",
            algorithm: "HS256"
        })
    }

    verify(token: string) {
        try {
            jwt.verify(token, this.config.jwtSecret, {
                algorithms: ["HS256"]
            })
        } catch(err) {
            throw new JWTTokenExpiredException()
        }
    }
}