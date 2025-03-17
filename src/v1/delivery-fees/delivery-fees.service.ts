import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BentoService } from 'src/bento/bento.service';
import { Repository } from 'typeorm';
import {
  CreateDeliveryFeeDto,
  CreateDeliveryFeeResponseDto,
} from './dto/create-delivery-fee.dto';
import { DeliveryFeeRequestsEntity } from './entities/delivery-fee.entity';

@Injectable()
export class DeliveryFeesService {
  constructor(
    private readonly bentoService: BentoService,

    @InjectRepository(DeliveryFeeRequestsEntity)
    private deliveryFeeRequestsRepository: Repository<DeliveryFeeRequestsEntity>,
  ) {}

  async create(
    createDeliveryFeeDto: CreateDeliveryFeeDto,
    bearerToken: string,
    userAgent: string,
  ): Promise<CreateDeliveryFeeResponseDto> {
    const retrieveDeliveryFee = await this.bentoService.retrieveDeliveryFee(
      createDeliveryFeeDto,
      bearerToken,
    );
    const newFee = retrieveDeliveryFee.fee * 1.13;

    const history = await this.deliveryFeeRequestsRepository.save({
      originalFee: retrieveDeliveryFee.fee,
      newFee,
      deliveryTime: retrieveDeliveryFee.deliveryTime,
      distanceMeters: retrieveDeliveryFee.distanceMeters,
      message: retrieveDeliveryFee.message,
      addressFrom: {
        type: 'Point',
        coordinates: [
          createDeliveryFeeDto.addressFrom.coordinates.lat,
          createDeliveryFeeDto.addressFrom.coordinates.lng,
        ],
      },
      addressTo: {
        type: 'Point',
        coordinates: [
          createDeliveryFeeDto.addressTo.coordinatesAdjustment.lat,
          createDeliveryFeeDto.addressTo.coordinatesAdjustment.lng,
        ],
      },
      userUuid: createDeliveryFeeDto.user.uuid,
      merchantUuid: createDeliveryFeeDto.merchant.id,
      userAgent,
    });

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
