import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModuleProvider } from 'src/config/providers/config-module.provider';
import { BentoServicePortProvider } from 'src/core/bento/ports/bento.service';
import { BentoModule } from './bento.module';
import { BentoServiceAdapter } from './bento.service';

describe('BentoServiceAdapter', () => {
  let service: BentoServiceAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModuleProvider, BentoModule],
    }).compile();

    service = module.get<BentoServiceAdapter>(BentoServicePortProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
