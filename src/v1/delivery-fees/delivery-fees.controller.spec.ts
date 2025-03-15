import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryFeesController } from './delivery-fees.controller';
import { DeliveryFeesService } from './delivery-fees.service';

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
