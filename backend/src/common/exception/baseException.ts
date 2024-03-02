import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./errorCode";

export default class BaseException extends HttpException {
    code: ErrorCode

    constructor(message: string, status: HttpStatus, code: ErrorCode) {
        super(message, status)
        this.code = code
    }
}