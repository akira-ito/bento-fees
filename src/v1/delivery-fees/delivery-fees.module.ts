import { Module } from '@nestjs/common';
import { DeliveryFeesService } from './delivery-fees.service';
import { DeliveryFeesController } from './delivery-fees.controller';

@Module({
  controllers: [DeliveryFeesController],
  providers: [DeliveryFeesService],
})
export class DeliveryFeesModule {}
