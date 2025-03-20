import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './adapters/api/v1/app/app.controller';
import { AuthModule } from './adapters/api/v1/auth/auth.module';
import { V1Module } from './adapters/api/v1/v1.module';
import { BentoModule } from './adapters/bento/bento.module';
import configuration, {
  AppConfiguration,
  DatabaseConfig,
} from './config/configuration';
import { AuthGuard } from './config/guard/auth.guard';

@Module({
  imports: [
    V1Module,
    BentoModule,
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfiguration, true>) => {
        const databaseConfig = configService.get<DatabaseConfig>('database');
        return {
          type: 'postgres',
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
          synchronize: false,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
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
