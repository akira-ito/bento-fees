import {
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Post,
  Request,
} from '@nestjs/common';
import { BentoException } from 'src/bento/exceptions/bento.exception';
import { AppException } from '../exceptions/exception';
import { AppAnauthorizedException } from '../exceptions/unauthorizd.exception';
import { DeliveryFeesService } from './delivery-fees.service';
import { CreateDeliveryFeeDto } from './dto/create-delivery-fee.dto';

@Controller()
export class DeliveryFeesController {
  private readonly logger = new Logger(DeliveryFeesController.name);

  constructor(private readonly deliveryFeesService: DeliveryFeesService) {}

  @Post()
  async create(
    @Request() req,
    @Headers('User-Agent') userAgent,
    @Body() createDeliveryFeeDto: CreateDeliveryFeeDto,
  ) {
    this.logger.log('Creating delivery fee', userAgent);
    try {
      return await this.deliveryFeesService.create(
        createDeliveryFeeDto,
        req.token,
        userAgent,
      );
    } catch (error) {
      this.logger.error('Error creating delivery fee', error);

      if (error instanceof BentoException) {
        throw new AppAnauthorizedException('Token is invalid', error);
      }
      throw new AppException('An error occurred', error);
    }
  }

  @Get()
  findAll() {
    return this.deliveryFeesService.findAll();
  }
}
