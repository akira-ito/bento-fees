import { Injectable } from '@nestjs/common';
import { BentoService } from 'src/bento/bento.service';
import {
  CreateDeliveryFeeDto,
  CreateDeliveryFeeResponseDto,
} from './dto/create-delivery-fee.dto';

@Injectable()
export class DeliveryFeesService {
  constructor(private readonly bentoService: BentoService) {}

  async create(
    createDeliveryFeeDto: CreateDeliveryFeeDto,
    bearerToken: string,
  ): Promise<CreateDeliveryFeeResponseDto> {
    const retrieveDeliveryFee = await this.bentoService.retrieveDeliveryFee(
      createDeliveryFeeDto,
      bearerToken,
    );
    const newFee = retrieveDeliveryFee.fee * 1.13;

    return {
      originalFee: retrieveDeliveryFee.fee,
      deliveryTime: retrieveDeliveryFee.deliveryTime,
      distanceMeters: retrieveDeliveryFee.distanceMeters,
      message: retrieveDeliveryFee.message,
      newFee,
    };
  }

  findAll() {
    return `This action returns all deliveryFees`;
  }
}
