import { Test, TestingModule } from '@nestjs/testing';
import { BentoModule } from 'src/adapters/bento/bento.module';
import { ConfigModuleProvider } from 'src/config/providers/config-module.provider';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [ConfigModuleProvider, BentoModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
