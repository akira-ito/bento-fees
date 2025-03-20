import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryFeesService } from './delivery-fees.service';

describe('DeliveryFeesService', () => {
  let service: DeliveryFeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryFeesService],
    }).compile();

    service = module.get<DeliveryFeesService>(DeliveryFeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
