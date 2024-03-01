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
            passwd: await bcrypt.hash(passwd, 10)
        })
    }
}