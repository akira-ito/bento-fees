import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { Public } from './v1/auth/constant';

export class HealthCheckDto {
  @ApiProperty({
    description: 'The status of the health check',
    example: 'ok',
  })
  status: string;

  constructor(status: string = 'ok') {
    this.status = status;
  }
}
@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('health')
  @ApiOperation({
    summary: 'Health check',
    description: 'Check the health of the service',
  })
  @ApiOkResponse({ description: 'Health check', type: HealthCheckDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  getHealth(): HealthCheckDto {
    return new HealthCheckDto('ok');
  }
}
