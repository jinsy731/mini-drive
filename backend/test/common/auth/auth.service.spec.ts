import * as jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"
import { decode } from "punycode"
import { JWTTokenExpiredException } from "src/common/auth/auth.exception"
import { AuthService } from "src/common/auth/auth.service"
import { User } from "src/user/domain/user.model"

describe("Auth Service", () => {
    describe("issueJWT", () => {
        it("return JWT", () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1d"
            }
            const authService = new AuthService(authConfig)
            const jwtString = authService.issueJWT(new User({id: 1, name: "name", email: "email"}))
            const decodedJwt = jwt.decode(jwtString)

            expect(decodedJwt["id"]).toBe(1)
            expect(decodedJwt["name"]).toBe("name")
            expect(decodedJwt["email"]).toBe("email")
        })
    })

    describe("verify", () => {
        it("should throw exception if jwt is expired", async () => {
            const authConfig = {
                jwtSecret: "a",
                expiresIn: "1s"
            }
            const authService = new AuthService(authConfig)
            const token = authService.issueJWT(new User({}))

            await new Promise(resolve => setTimeout(resolve, 2000))

            expect(() => authService.verify(token)).toThrow(JWTTokenExpiredException)
        }, 50000)
    })
})