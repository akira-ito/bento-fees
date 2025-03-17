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
import {
  CreateDeliveryFeeReqDto,
  CreateDeliveryFeeRespDto,
} from './dto/create-delivery-fee.dto';
import { FindDeliveryFeeRequestRespDto } from './dto/find-delivery-fee-request.dto';

@Controller()
export class DeliveryFeesController {
  private readonly logger = new Logger(DeliveryFeesController.name);

  constructor(private readonly deliveryFeesService: DeliveryFeesService) {}

  @Post()
  async create(
    @Request() req,
    @Headers('User-Agent') userAgent,
    @Body() createDeliveryFeeDto: CreateDeliveryFeeReqDto,
  ): Promise<CreateDeliveryFeeRespDto> {
    this.logger.log('Creating delivery fee', userAgent);
    try {
      const history = await this.deliveryFeesService.create(
        createDeliveryFeeDto,
        req.token,
        userAgent,
      );
      return {
        originalFee: history.originalFee,
        newFee: history.newFee,
        deliveryTime: history.deliveryTime,
        distanceMeters: history.distanceMeters,
        message: history.message,
      };
    } catch (error) {
      this.logger.error('Error creating delivery fee', error);

      if (error instanceof BentoException) {
        throw new AppAnauthorizedException('Token is invalid', error);
      }
      throw new AppException('An error occurred', error);
    }
  }

  @Get('requests')
  async findAllRequests(
    @Request() req,
  ): Promise<FindDeliveryFeeRequestRespDto[]> {
    this.logger.log('Finding all delivery fee requests');

    const requests = await this.deliveryFeesService.findAllRequests(req.user);
    return requests.map((request) =>
      FindDeliveryFeeRequestRespDto.fromEntity(request),
    );
  }
}
