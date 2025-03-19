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
  AppResponseFieldException,
} from 'src/exceptions/exception';
import { AppErrorResponseDto, MessageCode } from './app-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let messageCode = MessageCode.INTERNAL_SERVER_ERROR;
    let detail: string = exception.message;
    let fields: AppResponseFieldException[] | undefined;
    if (exception instanceof AppException) {
      const responseObj = exception.getResponse() as AppResponseException;
      messageCode = responseObj.messageCode;
      fields = responseObj.fields;
    } else if (exception instanceof HttpException) {
      const content = exception.getResponse() as {
        statusCode: number;
        message: string;
      };
      messageCode =
        {
          400: MessageCode.BAD_REQUEST,
          401: MessageCode.UNAUTHORIZED_USER,
          403: MessageCode.FORBIDDEN,
          404: MessageCode.NOT_FOUND,
          500: MessageCode.INTERNAL_SERVER_ERROR,
        }[content['statusCode']] ?? MessageCode.INTERNAL_SERVER_ERROR;
      detail = typeof content == 'string' ? content : content['message'];
    }

    response
      .status(status)
      .json(new AppErrorResponseDto(new Date(), detail, messageCode, fields));
  }
}
