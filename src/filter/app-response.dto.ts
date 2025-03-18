export enum MessageCode {
  INTERNAL_SERVER_ERROR = 'The server unavailable, try again later',
  UNAUTHORIZED_USER = 'Unauthorized user',
}

export class AppErrorResponseDto {
  timestamp: Date;
  detail: string;
  code: string;
  message: unknown;

  constructor(timestamp: Date, detail: string, code: MessageCode) {
    this.timestamp = timestamp;
    this.detail = detail;

    const messageCode = Object.entries(MessageCode).find(
      ([_, value]) => value === code,
    );
    if (messageCode) {
      this.code = messageCode[0];
      this.message = messageCode[1];
    }
  }
}
