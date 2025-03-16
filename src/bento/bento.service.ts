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

  async getDeliveryFee(deliveryFee: DeliveryFee, bearerToken: string) {
    try {
      const bentoConfig =
        this.configService.get<BentoConfig>('bentoIntegration');

      this.logger.log('Getting delivery fee');
      const response = await this.httpService.axiosRef.post(
        `${bentoConfig.host}/api/v1/delivery/fee`,
        deliveryFee,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
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
