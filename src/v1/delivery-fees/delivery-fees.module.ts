import { Module } from '@nestjs/common';
import { BentoModule } from 'src/bento/bento.module';
import { DeliveryFeesController } from './delivery-fees.controller';
import { DeliveryFeesService } from './delivery-fees.service';

@Module({
  controllers: [DeliveryFeesController],
  providers: [DeliveryFeesService],
  imports: [BentoModule],
})
export class DeliveryFeesModule {}
