import {
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  BentoException,
  BentoExceptionType,
} from 'src/bento/exceptions/bento.exception';
import { AppInternalServerException } from '../exceptions/internal-server.exception';
import { AppUnauthorizedException } from '../exceptions/unauthorized.exception';
import { DeliveryFeesService } from './delivery-fees.service';
import {
  CreateDeliveryFeeReqDto,
  CreateDeliveryFeeRespDto,
} from './dto/create-delivery-fee.dto';
import {
  FindDeliveryFeeRequestRespDto,
  OrderType,
  PaginateReqDto,
} from './dto/find-delivery-fee-request.dto';

@ApiBearerAuth()
@Controller()
export class DeliveryFeesController {
  private readonly logger = new Logger(DeliveryFeesController.name);

  constructor(private readonly deliveryFeesService: DeliveryFeesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new delivery fee',
    description: 'Create a new delivery fee request',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateDeliveryFeeRespDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(
    @Request() req,
    @Headers('User-Agent') userAgent,
    @Body() createDeliveryFeeDto: CreateDeliveryFeeReqDto,
  ): Promise<CreateDeliveryFeeRespDto> {
    this.logger.log('Creating delivery fee');
    try {
      const deliveryFeeRequest = await this.deliveryFeesService.create(
        createDeliveryFeeDto,
        req.token,
        userAgent,
      );
      return CreateDeliveryFeeRespDto.fromRequestEntity(deliveryFeeRequest);
    } catch (error) {
      this.logger.error('Error creating delivery fee', error);

      if (error instanceof BentoException) {
        if (error.type === BentoExceptionType.UNAUTHORIZED) {
          throw new AppUnauthorizedException('Token is invalid', error);
        }
        throw new AppInternalServerException(error.message, error);
      }

      throw new AppInternalServerException('An error occurred', error);
    }
  }

  @Get('requests')
  @ApiResponse({
    status: 200,
    description: 'The list of delivery fee requests.',
    type: [FindDeliveryFeeRequestRespDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAllRequests(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order') order: OrderType = OrderType.DESC,
  ): Promise<FindDeliveryFeeRequestRespDto[]> {
    this.logger.log('Finding all delivery fee requests');
    const paginate = new PaginateReqDto(page, limit, order);

    const [requests, total] = await this.deliveryFeesService.findAllRequests(
      req.user,
      paginate,
    );
    return requests.map((request) =>
      FindDeliveryFeeRequestRespDto.fromEntity(request),
    );
  }
}
