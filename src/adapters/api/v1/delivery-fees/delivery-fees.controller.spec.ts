import { Test, TestingModule } from '@nestjs/testing';
import { BentoModule } from 'src/adapters/bento/bento.module';
import { ConfigModuleProvider } from 'src/config/providers/config-module.provider';
import { TypeOrmModuleProvider } from 'src/config/providers/type-orm-module.provider';
import { DeliveryFeesController } from './delivery-fees.controller';
import { DeliveryFeesModule } from './delivery-fees.module';

describe('DeliveryFeesController', () => {
  let controller: DeliveryFeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModuleProvider,
        TypeOrmModuleProvider,
        BentoModule,
        DeliveryFeesModule,
      ],
    }).compile();

    controller = module.get<DeliveryFeesController>(DeliveryFeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
