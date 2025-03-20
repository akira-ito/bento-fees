import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { DeliveryFeesModule } from './delivery-fees/delivery-fees.module';

@Module({
  imports: [
    DeliveryFeesModule,
    AuthModule,
    RouterModule.register([
      {
        path: '/v1',
        children: [
          {
            path: '/delivery-fees',
            module: DeliveryFeesModule,
          },
          {
            path: '/auth',
            module: AuthModule,
          },
        ],
      },
    ]),
  ],
})
export class V1Module {}
