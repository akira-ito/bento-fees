import { HttpStatus } from '@nestjs/common';
import { MessageCode } from 'src/config/filter/app-error-response.dto';
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
