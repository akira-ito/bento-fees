import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { centsToDollars } from 'src/utils/currency.util';
import { coordinatesToPoints } from 'src/utils/distance.util';
import { Repository } from 'typeorm';
import { CreateDeliveryFeeReqDto } from '../../adapters/api/v1/delivery-fees/dto/create-delivery-fee.dto';
import { PaginateReqDto } from '../../adapters/api/v1/delivery-fees/dto/find-delivery-fee-request.dto';
import {
  BentoServicePort,
  BentoServicePortProvider,
} from '../bento/ports/bento.service';
import { User } from '../user/entities/user.entity';
import {
  DeliveryFeeConfigurationEntity,
  DeliveryFeeConfigurationType,
} from './entities/delivery-fee-configuration.entity';
import { DeliveryFeeRequestEntity } from './entities/delivery-fee-request.entity';

@Injectable()
export class DeliveryFeesService {
  constructor(
    @Inject(BentoServicePortProvider)
    private readonly bentoService: BentoServicePort,

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
      addressFrom: coordinatesToPoints(
        createDeliveryFeeDto.addressFrom.coordinates,
      ),
      addressTo: coordinatesToPoints(
        createDeliveryFeeDto.addressTo.coordinatesAdjustment,
      ),
      userUuid: createDeliveryFeeDto.user.uuid,
      merchantUuid: createDeliveryFeeDto.merchant.id,
      userAgent,
    });

    return deliveryFeeRequest;
  }

  async findAllRequests(
    user: User,
    paginate: PaginateReqDto,
  ): Promise<[DeliveryFeeRequestEntity[], number]> {
    console.log(user);

    const [requests, total] =
      await this.deliveryFeeRequestsRepository.findAndCount({
        where: { userUuid: user.user_id },
        take: paginate.limit,
        skip: paginate.limit * (paginate.page - 1),
        order: { createdAt: paginate.order },
      });
    return [requests, total];
  }
}
