import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BentoModule } from 'src/bento/bento.module';
import { DeliveryFeesController } from './delivery-fees.controller';
import { DeliveryFeesService } from './delivery-fees.service';
import { DeliveryFeeRequestsEntity } from './entities/delivery-fee.entity';

@Module({
  controllers: [DeliveryFeesController],
  providers: [DeliveryFeesService],
  imports: [BentoModule, TypeOrmModule.forFeature([DeliveryFeeRequestsEntity])],
  exports: [TypeOrmModule],
})
export class DeliveryFeesModule {}
