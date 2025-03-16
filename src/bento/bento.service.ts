import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { AppConfiguration, BentoConfig } from 'src/config/configuration';
import { DeliveryFee } from 'src/v1/delivery-fees/entities/delivery-fee.entity';
import {
  BentoException,
  BentoExceptionType,
} from './exceptions/bento.exception';

@Injectable()
export class BentoService {
  private readonly logger = new Logger(BentoService.name);

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService<AppConfiguration, true>,
  ) {}

  async getDeliveryFee(deliveryFee: DeliveryFee) {
    try {
      const bentoConfig =
        this.configService.get<BentoConfig>('bentoIntegration');

      this.logger.log('Getting delivery fee');
      const response = await this.httpService.axiosRef.post(
        `${bentoConfig.host}/api/v1/delivery/fee`,
        deliveryFee,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEwODA2N2Q4M2YwY2Y5YzcxNjQyNjUwYzUyMWQ0ZWZhNWI2YTNlMDkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRWRzb24gQWtpcmEgSXRvIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JlbnRvLWt5IiwiYXVkIjoiYmVudG8ta3kiLCJhdXRoX3RpbWUiOjE3NDIwMzQ2ODQsInVzZXJfaWQiOiJFOW5MWThKRUtyT1g3N0ZxMjBxaDd3Uk9KdWwyIiwic3ViIjoiRTluTFk4SkVLck9YNzdGcTIwcWg3d1JPSnVsMiIsImlhdCI6MTc0MjAzNDY4NCwiZXhwIjoxNzQyMDM4Mjg0LCJlbWFpbCI6ImVkc29uLmFraXJhMjFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZWRzb24uYWtpcmEyMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.o0fcsk3G0FXFuZoimddZwT7clH0_58VdK7wovqM6gRUse3sHwOp7oUpEvRE2Npf-9Ko5fFxanNh1bwao75bLawCSctk3YUqsllcY1bBmuOUtVz-9sK_jT0gEWgDY6bUeOaZxud4ajL1_1PDe_7nZ4OO0_H5TDwXPgFxYhLetIUEwS9-hsPrMSw1hqKQ67dJsVophLEQanPrc2R7vL1ZVL2r_Z3ZuJl77RXSlmDkyC9Ti0KJLy6DHl8F5SvkiY4uu_loI6n39G6CDYi9jLh8tcfKUUzF7nyXA6wE9FshqGfcdcAuUGL45DA27pRin1aukZ_1fAXNf___Inn5ftOVRwg',
          },
        },
      );

      const deliveryFeeData: DeliveryFee = response.data as DeliveryFee;

      return deliveryFee;
    } catch (error: unknown) {
      const { response, request, message } = error as AxiosError;

      if (response?.status === 401) {
        this.logger.error('Invalid token', {
          message: response.data,
        });
        throw new BentoException(
          'Unauthorized',
          BentoExceptionType.UNAUTHORIZED,
        );
      }
      if (request) {
        console.log(request);
        return;
      }
      this.logger.error('Error getting delivery fee', {
        message,
      });
      throw new BentoException('Error getting delivery fee');
    }
  }
}
