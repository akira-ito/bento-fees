import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BentoModule } from 'src/adapters/bento/bento.module';
import { DeliveryFeeConfigurationEntity } from 'src/core/delivery-fees/entities/delivery-fee-configuration.entity';
import { DeliveryFeeRequestEntity } from 'src/core/delivery-fees/entities/delivery-fee-request.entity';
import { DeliveryFeesService } from '../../../../core/delivery-fees/delivery-fees.service';
import { DeliveryFeesController } from './delivery-fees.controller';

@Module({
  controllers: [DeliveryFeesController],
  providers: [DeliveryFeesService],
  imports: [
    BentoModule,
    TypeOrmModule.forFeature([
      DeliveryFeeRequestEntity,
      DeliveryFeeConfigurationEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DeliveryFeesModule {}
