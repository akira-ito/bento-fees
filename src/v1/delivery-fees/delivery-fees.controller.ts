import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeliveryFeesService } from './delivery-fees.service';
import { CreateDeliveryFeeDto } from './dto/create-delivery-fee.dto';

@Controller()
export class DeliveryFeesController {
  constructor(private readonly deliveryFeesService: DeliveryFeesService) {}

  @Post()
  create(@Body() createDeliveryFeeDto: CreateDeliveryFeeDto) {
    return this.deliveryFeesService.create(createDeliveryFeeDto);
  }

  @Get()
  findAll() {
    return this.deliveryFeesService.findAll();
  }
}
