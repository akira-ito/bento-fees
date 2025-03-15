import { Test, TestingModule } from '@nestjs/testing';
import { BentoService } from './bento.service';

describe('BentoService', () => {
  let service: BentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BentoService],
    }).compile();

    service = module.get<BentoService>(BentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
