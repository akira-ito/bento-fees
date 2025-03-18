import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppBadRequestException } from 'src/exceptions/bad-request.exception';
import { AppException, AppResponseException } from 'src/exceptions/exception';
import { AppErrorResponseDto, MessageCode } from './app-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let messageCode = MessageCode.INTERNAL_SERVER_ERROR;
    let detail: any = exception.message;
    let fields: any = undefined;
    if (exception instanceof AppException) {
      const responseObj = exception.getResponse() as AppResponseException;
      messageCode = responseObj.messageCode;
    }

    if (exception instanceof BadRequestException) {
      messageCode = MessageCode.BAD_REQUEST;
      const content = exception.getResponse();
      detail = typeof content == 'string' ? content : content['message'];
    } else if (exception instanceof AppBadRequestException) {
      const responseObj = exception.getResponse() as AppResponseException;
      messageCode = responseObj.messageCode;
      fields = responseObj.fields;
    }
    console.log(exception, exception instanceof AppBadRequestException, detail);

    response
      .status(status)
      .json(new AppErrorResponseDto(new Date(), detail, messageCode, fields));
  }
}
