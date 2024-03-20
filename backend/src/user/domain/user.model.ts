import { InvalidPasswordException } from './../../common/exception/InvalidPasswordException';
import * as bcrypt from "bcrypt"

export class User {
    id: number
    email: string
    name: string
    passwd: string

    constructor(data: {[P in keyof User]?: User[P]}) {
        Object.assign(this, data)
    }

    static async create(email: string, name: string, passwd: string): Promise<User> {
        return new User({
            email: email,
            name: name,
            passwd: passwd
        })
    }

    async authenticate(plainPasswd: string) {
        const match = await bcrypt.compare(plainPasswd, this.passwd)

        if(!match) throw new InvalidPasswordException()
    }
}