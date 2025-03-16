import { Body, Controller, Get, Logger, Post, Request } from '@nestjs/common';
import { DeliveryFeesService } from './delivery-fees.service';
import { CreateDeliveryFeeDto } from './dto/create-delivery-fee.dto';

@Controller()
export class DeliveryFeesController {
  private readonly logger = new Logger(DeliveryFeesController.name);

  constructor(private readonly deliveryFeesService: DeliveryFeesService) {}

  @Post()
  create(@Request() req, @Body() createDeliveryFeeDto: CreateDeliveryFeeDto) {
    this.logger.log('Creating delivery fee');
    return this.deliveryFeesService.create(createDeliveryFeeDto, req.token);
  }

  @Get()
  findAll() {
    return this.deliveryFeesService.findAll();
  }
}
