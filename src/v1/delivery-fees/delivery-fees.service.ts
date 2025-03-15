import { Injectable } from '@nestjs/common';
import { BentoService } from 'src/bento/bento.service';
import { CreateDeliveryFeeDto } from './dto/create-delivery-fee.dto';

@Injectable()
export class DeliveryFeesService {
  constructor(private readonly bentoService: BentoService) {}

  create(createDeliveryFeeDto: CreateDeliveryFeeDto) {
    const deliveryFee = this.bentoService.getDeliveryFee(createDeliveryFeeDto);
    return deliveryFee;
  }

  findAll() {
    return `This action returns all deliveryFees`;
  }
}
