import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AppException,
  AppResponseException,
} from 'src/v1/exceptions/exception';
import { AppErrorResponseDto, MessageCode } from './app-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let messageCode = MessageCode.INTERNAL_SERVER_ERROR;
    if (exception instanceof AppException) {
      const responseObj = exception.getResponse() as AppResponseException;
      messageCode = responseObj.messageCode;
    }

    response
      .status(status)
      .json(
        new AppErrorResponseDto(new Date(), exception.message, messageCode),
      );
  }
}
