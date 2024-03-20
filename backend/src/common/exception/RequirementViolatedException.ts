import { HttpStatus } from "@nestjs/common";
import BaseException from "./BaseException";
import { ErrorCode } from "./ErrorCode";

export class RequirementViolatedException extends BaseException {
    constructor(message: string) {
        super(
            `Requirement violated :${message}`,
            HttpStatus.CONFLICT,
            ErrorCode.REQUIREMENT_VIOLATED
        )
    }
}