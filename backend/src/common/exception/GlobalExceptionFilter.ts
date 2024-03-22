import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from "@nestjs/common"
  import { Request, Response } from "express"
import BaseException from "./BaseException"
import { ErrorCode } from "./ErrorCode"
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const req = ctx.getRequest<Request>()
      const res = ctx.getResponse<Response>()
  
      if (
        !(
          exception instanceof BaseException || exception instanceof HttpException
        )
      ) {
        console.log("exception: ", exception)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          timestamp: new Date(),
          errorCode: ErrorCode.UNKNOWN,
          path: req.url,
          detail: "알 수 없는 오류가 발생했습니다.",
        })
      }
  
      const response = (exception as BaseException).getResponse()
    
      const log = {
        timestamp: new Date(),
        url: req.url,
        response: response,
        stack: (exception as HttpException).stack,
      }
  
      console.log("exception log: \n", log)
  
      res.status((exception as BaseException).getStatus()).json({
        timestamp: new Date(),
        errorCode: (exception as BaseException).code,
        path: req.url,
        detail: response,
      })
    }
  }
  