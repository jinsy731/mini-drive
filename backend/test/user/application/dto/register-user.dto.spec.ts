import { validate } from "@nestjs/class-validator"
import * as crypto from "crypto"
import { RegisterUserRequest } from "src/user/application/dto/register-user.dto"
import { generateRandomAlphabeticString, generateRandomAlphaNumericString } from "test/testUtils"

describe("RegisterUserDto", () => {
    describe("Validation", () => {
        test("name should be longer than 2", async () => {
            const req = new RegisterUserRequest("A", "email@test.com", "Password1234!@#$")
            const errors = await validate(req)
            
            const nameValidationError = errors[0]
            
            expect(errors.length).toBe(1)
            expect(nameValidationError.property).toBe("name")
        })

        test("email should have email format",async () => {
            const req = new RegisterUserRequest("ABCD", "emailtest.com", "Password1234!@#$")
            const errors = await validate(req)
            
            expect(errors.length).toBe(1)
            expect(errors[0].property).toBe("email")
            expect(errors[0]).toHaveProperty("constraints", {isEmail: "email must be an email"})
        })

        test("password should contains upper, lowercase alphabetic letter and number, speical character", async () => {
            const req1 = new RegisterUserRequest("ABCD", "email@test.com", "Password!@#$!@#$!@#$")
            const req2 = new RegisterUserRequest("ABCD", "email@test.com", "Password123412341234")
            const req3 = new RegisterUserRequest("ABCD", "email@test.com", "PASSWORD1234!@#$")
            const req4 = new RegisterUserRequest("ABCD", "email@test.com", "password1234!@#$")
            const errors1 = await validate(req1)
            const errors2 = await validate(req2)
            const errors3 = await validate(req3)
            const errors4 = await validate(req4)
            
            expect(errors1.length).toBe(1)
            expect(errors1[0].property).toBe("passwd")
            expect(errors2.length).toBe(1)
            expect(errors2[0].property).toBe("passwd")
            expect(errors3.length).toBe(1)
            expect(errors3[0].property).toBe("passwd")
            expect(errors4.length).toBe(1)
            expect(errors4[0].property).toBe("passwd")
        })
    })
})