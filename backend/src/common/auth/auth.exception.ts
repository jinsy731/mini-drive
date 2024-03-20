import { HttpStatus } from "@nestjs/common";
import BaseException from "../exception/BaseException";
import { ErrorCode } from "../exception/ErrorCode";

export class JWTTokenExpiredException extends BaseException {
    constructor() {
        super("JWT Token Expired.", HttpStatus.UNAUTHORIZED, ErrorCode.JWT_TOKEN_EXPIRED)
    }
}