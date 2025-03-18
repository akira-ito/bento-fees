import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BentoService } from 'src/bento/bento.service';
import { centsToDollars } from 'src/utils/currency.utils';
import { Repository } from 'typeorm';
import { CreateDeliveryFeeReqDto } from './dto/create-delivery-fee.dto';
import { PaginateReqDto } from './dto/find-delivery-fee-request.dto';
import {
  DeliveryFeeConfigurationEntity,
  DeliveryFeeConfigurationType,
} from './entities/delivery-fee-configuration.entity';
import { DeliveryFeeRequestEntity } from './entities/delivery-fee-request.entity';

@Injectable()
export class DeliveryFeesService {
  constructor(
    private readonly bentoService: BentoService,

    @InjectRepository(DeliveryFeeRequestEntity)
    private deliveryFeeRequestsRepository: Repository<DeliveryFeeRequestEntity>,

    @InjectRepository(DeliveryFeeConfigurationEntity)
    private deliveryFeeConfigurationRepository: Repository<DeliveryFeeConfigurationEntity>,
  ) {}

  async create(
    createDeliveryFeeDto: CreateDeliveryFeeReqDto,
    bearerToken: string,
    userAgent: string,
  ): Promise<DeliveryFeeRequestEntity> {
    const retrieveDeliveryFee = await this.bentoService.retrieveDeliveryFee(
      createDeliveryFeeDto,
      bearerToken,
    );
    const deliveryFeeConfiguration =
      await this.deliveryFeeConfigurationRepository.findOneBy({
        type: DeliveryFeeConfigurationType.MARGIN_FEE,
      });

    const newFee =
      retrieveDeliveryFee.fee *
      (1 + (deliveryFeeConfiguration?.value ?? 13) / 100);

    const deliveryFeeRequest = await this.deliveryFeeRequestsRepository.save({
      originalFee: centsToDollars(retrieveDeliveryFee.fee),
      newFee: centsToDollars(newFee),
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

    return deliveryFeeRequest;
  }

  async findAllRequests(
    user,
    paginate: PaginateReqDto,
  ): Promise<[DeliveryFeeRequestEntity[], number]> {
    const [requests, total] =
      await this.deliveryFeeRequestsRepository.findAndCount({
        where: { userUuid: user.uuid },
        take: paginate.limit,
        skip: paginate.limit * (paginate.page - 1),
        order: { createdAt: paginate.order },
      });
    return [requests, total];
  }
}
