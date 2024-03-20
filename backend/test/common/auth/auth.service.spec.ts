import { RequirementViolatedException } from './../../../src/common/exception/RequirementViolatedException';
import { TokenStatus } from '@prisma/client';
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import * as jwt from "jsonwebtoken"
import { JWTTokenExpiredException } from "src/common/auth/auth.exception"
import { AuthService } from "src/common/auth/auth.service"
import { User } from "src/user/domain/user.model"
import { PrismaRefreshTokenRepository } from 'src/common/auth/prisma.refresh-token.repository';

jest.mock("uuid", () => ({
    v4: jest.fn().mockReturnValue("MOCK_UUID")
}))

const mockRepository = {
    upsert: jest.fn(),
    findUnique: jest.fn()
}

describe("Auth Service", () => {
    let jwtService: JwtService
    let repository: PrismaRefreshTokenRepository

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                JwtService,
                {
                    provide: PrismaRefreshTokenRepository,
                    useValue: mockRepository
                }
            ]
        }).compile()

        jwtService = module.get(JwtService)
        repository = module.get(PrismaRefreshTokenRepository)
    })
    
    describe("issueJWT", () => {
        it("return JWT", async () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1d",
                refreshExpiresIn: "1d"
            }
            const authService = new AuthService(authConfig, jwtService, repository)
            const jwtString = await authService.issueJWT(new User({id: 1, name: "name", email: "email", passwd: "AA"}))
            const decodedAccessToken = jwt.decode(jwtString.accessToken)
            const decodedRefreshToken = jwt.decode(jwtString.refreshToken)
            
            expect(decodedAccessToken["id"]).toBe(1)
            expect(decodedAccessToken["name"]).toBe("name")
            expect(decodedAccessToken["email"]).toBe("email")

            expect(decodedRefreshToken["id"]).toBe(1)
            expect(decodedRefreshToken["name"]).toBe("name")
            expect(decodedRefreshToken["email"]).toBe("email")
            expect(decodedRefreshToken["jti"]).toBe("MOCK_UUID")
        })
    })

    describe("verify", () => {
        it("should throw exception if accessToken is expired", async () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1s",
                refreshExpiresIn: "1d"
            }
            const authService = new AuthService(authConfig, jwtService, repository)
            const token = await authService.issueJWT(new User({name: "name"}))

            await new Promise(resolve => setTimeout(resolve, 1100))

            expect(() => authService.verify(token.accessToken)).toThrow(JWTTokenExpiredException)
        })

        it("should throw exception if refreshToken is expired", async () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1s",
                refreshExpiresIn: "1s"
            }

            const authService = new AuthService(authConfig, jwtService, repository)
            const token = await authService.issueJWT(new User({name: "name"}))

            await new Promise(resolve => setTimeout(resolve, 1100))

            expect(() => authService.verify(token.refreshToken)).toThrow(JWTTokenExpiredException)
        })

        it("should return decoded token", async () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1d",
                refreshExpiresIn: "1d"
            }
            const authService = new AuthService(authConfig, jwtService, repository)
            const token = await authService.issueJWT(new User({name: "name"}))

            const decoded = authService.verify(token.accessToken)
        })
    })

    describe("refresh()", () => {
        it("should return new AuthToken", async () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1d",
                refreshExpiresIn: "1d"
            }
            const authService = new AuthService(authConfig, jwtService, repository)
            const token = await authService.issueJWT(new User({id: 1, name: "name"}))
    
            const decoded = jwt.decode(token.refreshToken)
    
            jest.spyOn(repository, 'findUnique').mockResolvedValue({
                jti: decoded["jti"],
                payload: token.refreshToken,
                status: TokenStatus.USE,
                userId: 1
            })
    
            const newToken = await authService.refresh(token.refreshToken)

            expect(newToken.accessToken).not.toBeNull()
            expect(newToken.refreshToken).not.toBeNull()
        })

        it("should throw exception if refreshToken doesn't exists in repository", async () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1d",
                refreshExpiresIn: "1d"
            }
            const authService = new AuthService(authConfig, jwtService, repository)
            const token = await authService.issueJWT(new User({id: 1, name: "name"}))

            jest.spyOn(repository, 'findUnique').mockResolvedValue(null)

            expect(authService.refresh(token.refreshToken)).rejects.toThrow(RequirementViolatedException)
        })

        it("should throw exception if refreshToken is unavailable", async () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1d",
                refreshExpiresIn: "1d"
            }
            const authService = new AuthService(authConfig, jwtService, repository)
            const token = await authService.issueJWT(new User({id: 1, name: "name"}))

            jest.spyOn(repository, 'findUnique').mockResolvedValue({
                jti: "jti",
                payload: token.refreshToken,
                status: TokenStatus.DISCARD,
                userId: 1
            })

            expect(authService.refresh(token.refreshToken)).rejects.toThrow(RequirementViolatedException)
        })
    })
})