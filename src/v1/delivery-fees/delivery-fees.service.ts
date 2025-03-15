import { Injectable } from '@nestjs/common';
import { CreateDeliveryFeeDto } from './dto/create-delivery-fee.dto';
import { UpdateDeliveryFeeDto } from './dto/update-delivery-fee.dto';

@Injectable()
export class DeliveryFeesService {
  create(createDeliveryFeeDto: CreateDeliveryFeeDto) {
    return 'This action adds a new deliveryFee';
  }

  findAll() {
    return `This action returns all deliveryFees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryFee`;
  }

  update(id: number, updateDeliveryFeeDto: UpdateDeliveryFeeDto) {
    return `This action updates a #${id} deliveryFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryFee`;
  }
}
