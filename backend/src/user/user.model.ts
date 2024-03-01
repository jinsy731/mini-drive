export class User {
    id: number
    email: string
    name: string
    passwd: string

    constructor(data: {[P in keyof User]: User[P]}) {
        Object.assign(this, data)
    }

    static create(email: string, name: string, passwd: string): User {
        return new User({
            email: email,
            name: name,
            passwd: passwd
        })
    }
}