import { HttpStatus } from '@nestjs/common';
import { MessageCode } from 'src/filter/app-response.dto';
import { AppException } from './exception';

export class AppInternalServerException extends AppException {
  constructor(message: string, error: any) {
    super(
      message,
      MessageCode.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error,
    );
  }
}
