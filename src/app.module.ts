import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './adapters/api/v1/app/app.controller';
import { V1Module } from './adapters/api/v1/v1.module';
import { BentoModule } from './adapters/bento/bento.module';
import { AuthGuard } from './config/guard/auth.guard';
import { ConfigModuleProvider } from './config/providers/config-module.provider';
import { JwtModuleProvider } from './config/providers/jwt-module.provider';
import { TypeOrmModuleProvider } from './config/providers/type-orm-module.provider';

@Module({
  imports: [
    V1Module,
    BentoModule,
    ConfigModuleProvider,
    JwtModuleProvider,
    TypeOrmModuleProvider,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
