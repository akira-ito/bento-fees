import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfiguration, BentoConfig } from 'src/config/configuration';
import { BentoServicePortProvider } from 'src/core/bento/ports/bento.service';
import { BentoServiceAdapter } from './bento.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfiguration, true>) => ({
        timeout: configService.get<BentoConfig>('bentoIntegration').timeout,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: BentoServicePortProvider,
      useClass: BentoServiceAdapter,
    },
  ],
  exports: [
    {
      provide: BentoServicePortProvider,
      useClass: BentoServiceAdapter,
    },
  ],
})
export class BentoModule {}
