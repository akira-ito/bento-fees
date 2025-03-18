import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageCode } from 'src/filter/app-response.dto';

export interface AppResponseException {
  readonly status: HttpStatus;
  readonly message: string;
  readonly messageCode: MessageCode;
  readonly error?: any;
}

export class AppException extends HttpException {
  constructor(
    message: string,
    messageCode: MessageCode,
    status: HttpStatus,
    error?: any,
  ) {
    super(
      {
        status,
        message,
        messageCode,
      } as AppResponseException,
      status,
      {
        cause: error,
      },
    );
  }
}
