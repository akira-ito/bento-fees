import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BentoModule } from './bento/bento.module';
import configuration from './config/configuration';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    V1Module,
    BentoModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
