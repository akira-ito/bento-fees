import { HttpStatus } from '@nestjs/common';
import { MessageCode } from 'src/config/filter/app-error-response.dto';
import { AppException } from './exception';

export class AppUnauthorizedException extends AppException {
  constructor(message: string, error?: any) {
    super(
      message,
      MessageCode.UNAUTHORIZED_USER,
      HttpStatus.UNAUTHORIZED,
      error,
    );
  }
}
