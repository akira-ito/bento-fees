import { Controller, Get } from '@nestjs/common';
import { Public } from './v1/auth/constant';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('health')
  getHealth(): string {
    return 'on';
  }
}
