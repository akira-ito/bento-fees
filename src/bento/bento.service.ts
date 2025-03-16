import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { AppConfiguration, BentoConfig } from 'src/config/configuration';
import {
  BentoException,
  BentoExceptionType,
} from './exceptions/bento.exception';
import { RetrieveDeliveryFeeRequest } from './schemas/request/retrieve-delivery-fee.req';
import { RetrieveDeliveryFeeResponse } from './schemas/response/retrieve-delivery-fee.response';

@Injectable()
export class BentoService {
  private readonly logger = new Logger(BentoService.name);

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService<AppConfiguration, true>,
  ) {}

  async retrieveDeliveryFee(
    deliveryFee: RetrieveDeliveryFeeRequest,
    bearerToken: string,
  ): Promise<RetrieveDeliveryFeeResponse> {
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

      return response.data as RetrieveDeliveryFeeResponse;
    } catch (error: unknown) {
      const { response, message } = error as AxiosError;

      if (response?.status === 401) {
        this.logger.error('Invalid token', {
          message: response.data,
        });
        throw new BentoException(
          'Unauthorized',
          BentoExceptionType.UNAUTHORIZED,
        );
      }
      this.logger.error('Error getting delivery fee', {
        message,
      });
      throw new BentoException('Error getting delivery fee');
    }
  }
}
