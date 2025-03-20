import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppErrorResponseDto, MessageCode } from './app-error-response.dto';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    httpAdapter.reply(
      ctx.getResponse(),
      new AppErrorResponseDto(
        new Date(),
        'The server unavailable',
        MessageCode.INTERNAL_SERVER_ERROR,
      ),
      httpStatus,
    );
  }
}
