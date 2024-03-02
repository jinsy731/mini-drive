import { HttpStatus } from "@nestjs/common";
import BaseException from "../exception/baseException";
import { ErrorCode } from "../exception/errorCode";

export class JWTTokenExpiredException extends BaseException {
    constructor() {
        super("JWT Token Expired.", HttpStatus.UNAUTHORIZED, ErrorCode.JWT_TOKEN_EXPIRED)
    }
}