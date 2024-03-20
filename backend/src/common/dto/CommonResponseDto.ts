import { HttpStatus } from '@nestjs/common';
export class ApiResponse<T> {
    result: ApiResult
    data?: T | T[]
    error?: ErrorInfo

    constructor(obj: {result: ApiResult, data?: T | T[], error?: ErrorInfo}) {
        this.result = obj.result
        this.data = obj.data
        this.error = obj.error
    }

    static success<T>(data?: T | T[]) {
        return new ApiResponse({
            result: ApiResult.SUCCESS, 
            data: data
        })
    }

    static fail(errorInfo: ErrorInfo) {
        return new ApiResponse({
            result: ApiResult.FAIL,
            error: errorInfo
        })
    }
}

export class ErrorInfo {
    statusCode: HttpStatus
    message: string
}

export class PaginatedApiResponse<T> extends ApiResponse<T> {
    pageInfo: PageInfo
}

export class PageInfo {
    curPage: number
    curSize: number
    totalElements: number
    totalPage: number
}

export enum ApiResult {
    SUCCESS = "success",
    FAIL = "fail"
}