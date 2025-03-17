import { HttpException, HttpStatus } from '@nestjs/common';

export class AppAnauthorizedException extends HttpException {
  constructor(message: string, error: any) {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: message,
      },
      HttpStatus.UNAUTHORIZED,
      {
        cause: error,
      },
    );
  }
}
