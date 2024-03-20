import { HttpStatus } from "@nestjs/common";
import BaseException from "./BaseException";
import { ErrorCode } from "./ErrorCode";

export class InvalidPasswordException extends BaseException {
    constructor() {
        super(
            "Invalid password.",
            HttpStatus.BAD_REQUEST,
            ErrorCode.INVALID_PASSWORD
        )
    }
}