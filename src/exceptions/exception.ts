import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageCode } from 'src/filter/app-response.dto';

export interface AppResponseFieldException {
  readonly name: string;
  readonly errors?: { [type: string]: string };
  readonly value?: any;
}
export interface AppResponseException {
  readonly status: HttpStatus;
  readonly message: string;
  readonly messageCode: MessageCode;
  readonly error?: any;
  readonly fields?: AppResponseFieldException[];
}

export class AppException extends HttpException {
  constructor(
    message: string,
    messageCode: MessageCode,
    status: HttpStatus,
    error?: any,
    fields?: AppResponseException['fields'],
  ) {
    super(
      {
        status,
        message,
        messageCode,
        fields,
      } as AppResponseException,
      status,
      {
        cause: error,
      },
    );
  }
}
