import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BentoService } from 'src/bento/bento.service';
import { Repository } from 'typeorm';
import { CreateDeliveryFeeReqDto } from './dto/create-delivery-fee.dto';
import { PaginateReqDto } from './dto/find-delivery-fee-request.dto';
import { DeliveryFeeRequestEntity } from './entities/delivery-fee-request.entity';

@Injectable()
export class DeliveryFeesService {
  constructor(
    private readonly bentoService: BentoService,

    @InjectRepository(DeliveryFeeRequestEntity)
    private deliveryFeeRequestsRepository: Repository<DeliveryFeeRequestEntity>,
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

    return history;
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
