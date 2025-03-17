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
import { SignInResponse } from './schemas/response/sign-in.response';

@Injectable()
export class BentoService {
  private readonly logger = new Logger(BentoService.name);
  private bentoConfig: BentoConfig;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService<AppConfiguration, true>,
  ) {
    this.bentoConfig = this.configService.get<BentoConfig>('bentoIntegration');
  }

  async retrieveDeliveryFee(
    deliveryFee: RetrieveDeliveryFeeRequest,
    bearerToken: string,
  ): Promise<RetrieveDeliveryFeeResponse> {
    try {
      this.logger.log('Getting delivery fee');
      const response = await this.httpService.axiosRef.post(
        `${this.bentoConfig.host}/api/v1/delivery/fee`,
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

  async signIn(username: string, password: string): Promise<SignInResponse> {
    this.logger.log('Signing in');

    try {
      const response = await this.httpService.axiosRef.post(
        `${this.bentoConfig.identityProviderHost}/v1/accounts:signInWithPassword?key=${this.bentoConfig.identityProviderApiKey}`,
        {
          returnSecureToken: true,
          email: username,
          password,
          clientType: 'CLIENT_TYPE_WEB',
        },
      );

      return response.data as SignInResponse;
    } catch (error: unknown) {
      const { response, message } = error as AxiosError;

      if (response?.status === 400) {
        this.logger.error('Sign failed', {
          message: response.data,
        });
        throw new BentoException(
          'Unauthorized, invalid username or password',
          BentoExceptionType.UNAUTHORIZED,
        );
      }

      this.logger.error('Error to signIn', {
        message,
      });
      throw new BentoException('Error to signIn');
    }
  }
}
