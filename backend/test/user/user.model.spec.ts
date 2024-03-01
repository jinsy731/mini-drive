import * as bcrypt from "bcrypt"
import { User } from "src/user/user.model"

jest.mock("bcrypt", () => ({
    hash: jest.fn().mockResolvedValue("MOCK_HASH")
}))

describe("User Model", () => {
    beforeEach(() => {
        jest.resetModules()
    })
    describe("Create User", () => {
        it("should encrypt passwd", async () => {
            const user = await User.create("email", "name", "passwd")

            expect(user.name).toBe("name")
            expect(user.email).toBe("email")
            expect(user.passwd).toBe("MOCK_HASH")
        })
    })
})