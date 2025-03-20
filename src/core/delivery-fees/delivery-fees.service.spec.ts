import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BentoModule } from 'src/adapters/bento/bento.module';
import { ConfigModuleProvider } from 'src/config/providers/config-module.provider';
import { TypeOrmModuleProvider } from 'src/config/providers/type-orm-module.provider';
import { DeliveryFeesService } from './delivery-fees.service';
import { DeliveryFeeConfigurationEntity } from './entities/delivery-fee-configuration.entity';
import { DeliveryFeeRequestEntity } from './entities/delivery-fee-request.entity';

describe('DeliveryFeesService', () => {
  let service: DeliveryFeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryFeesService],
      imports: [
        ConfigModuleProvider,
        TypeOrmModuleProvider,
        BentoModule,
        TypeOrmModule.forFeature([
          DeliveryFeeRequestEntity,
          DeliveryFeeConfigurationEntity,
        ]),
      ],
      exports: [TypeOrmModule],
    }).compile();

    service = module.get<DeliveryFeesService>(DeliveryFeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
