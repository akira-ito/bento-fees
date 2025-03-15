import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BentoService } from './bento.service';

@Module({
  imports: [HttpModule],
  providers: [BentoService],
  exports: [BentoService],
})
export class BentoModule {}
