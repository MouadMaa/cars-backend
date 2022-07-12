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
    const statusCode = exception.getStatus()

    const exceptionResponse = exception.getResponse()
    const errorInfo =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, unknown>) // casting to Record<string, unknown> prevents errors from casting to type of object

    const status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'

    if (process.env.NODE_ENV === 'development') {
      response.status(statusCode).json({
        status,
        ...errorInfo,
        timestamp: new Date().toISOString(),
        path: request.url,
      })
    } else {
      response.status(statusCode).json({
        status: 'error',
        message: 'Something went very wrong!',
      })
    }
  }
}
