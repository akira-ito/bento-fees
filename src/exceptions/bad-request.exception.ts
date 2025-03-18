import { HttpStatus } from '@nestjs/common';
import { MessageCode } from 'src/filter/app-response.dto';
import { AppException, AppResponseException } from './exception';

export class AppBadRequestException extends AppException {
  constructor(
    message: string,
    error: any,
    fields?: AppResponseException['fields'],
    code: MessageCode = MessageCode.BAD_REQUEST,
  ) {
    super(message, code, HttpStatus.BAD_REQUEST, error, fields);
  }
}
