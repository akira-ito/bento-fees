import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BentoModule } from 'src/bento/bento.module';
import { DeliveryFeesController } from './delivery-fees.controller';
import { DeliveryFeesService } from './delivery-fees.service';
import { DeliveryFeeConfigurationEntity } from './entities/delivery-fee-configuration.entity';
import { DeliveryFeeRequestEntity } from './entities/delivery-fee-request.entity';

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
