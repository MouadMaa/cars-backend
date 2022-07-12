import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    const exceptionResponse = exception.getResponse()
    const errorInfo =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, unknown>) // casting to Record<string, unknown> prevents errors from casting to type of object

    response.status(status).json({
      ...errorInfo,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
