import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { AppResponseException } from 'src/exceptions/exception';

export enum MessageCode {
  INTERNAL_SERVER_ERROR = 'The server unavailable, try again later',
  UNAUTHORIZED_USER = 'Unauthorized user',
  BAD_REQUEST = 'Bad request',
  NOT_FOUND = 'Resource not found',
  FORBIDDEN = 'Forbidden',
  FIELDS_VALIDATION_ERROR = 'Please check the fields, some of them are invalid',
}

@ApiSchema({
  description: 'Data Transfer Object for representing error responses',
})
export class AppErrorResponseDto {
  @ApiProperty({ description: 'The timestamp when the error occurred' })
  timestamp: Date;

  @ApiProperty({ description: 'Detailed description of the error' })
  detail: string;

  @ApiProperty({
    enum: Object.keys(MessageCode),
    description: 'Error code representing the type of error',
  })
  code: string;

  @ApiProperty({
    enum: Object.values(MessageCode),
    description: 'Human-readable message describing the error',
  })
  message: string;

  @ApiProperty({
    description: 'List of fields that caused the error',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the field',
        },
        errors: {
          type: 'object',
          description: 'List of errors associated with the field',
          additionalProperties: {
            type: 'string',
            description: 'Description of the error',
          },
        },
        value: {
          type: 'string',
          description: 'Value of the field',
        },
      },
    },
  })
  fields?: AppResponseException['fields'];

  constructor(
    timestamp: Date,
    detail: string,
    code: MessageCode,
    fields?: AppResponseException['fields'],
  ) {
    this.timestamp = timestamp;
    this.detail = detail;

    const messageCode = Object.entries(MessageCode).find(
      ([_, value]) => value === code,
    );
    if (messageCode) {
      this.code = messageCode[0];
      this.message = messageCode[1];
    }
    this.fields = fields;
  }
}
