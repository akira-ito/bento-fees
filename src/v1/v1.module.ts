import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DeliveryFeesModule } from './delivery-fees/delivery-fees.module';

@Module({
  imports: [
    DeliveryFeesModule,
    RouterModule.register([
      {
        path: '/v1',
        children: [
          {
            path: '/delivery-fees',
            module: DeliveryFeesModule,
          },
        ],
      },
    ]),
  ],
})
export class V1Module {}
