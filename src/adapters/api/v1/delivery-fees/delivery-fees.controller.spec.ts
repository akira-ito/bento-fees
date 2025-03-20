import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryFeesService } from '../../../../core/delivery-fees/delivery-fees.service';
import { DeliveryFeesController } from './delivery-fees.controller';

describe('DeliveryFeesController', () => {
  let controller: DeliveryFeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryFeesController],
      providers: [DeliveryFeesService],
    }).compile();

    controller = module.get<DeliveryFeesController>(DeliveryFeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
