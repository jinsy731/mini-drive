export class RefreshToken {
    jti: string
    userId: number
    payload: string
    status: TokenStatus

    constructor(data: {[P in keyof RefreshToken]?: RefreshToken[P]}) {
        this.jti = data.jti
        this.userId = data.userId
        this.payload = data.payload
        this.status = data.status
    }
}

export type TokenStatus = "USE" | "DISCARD"