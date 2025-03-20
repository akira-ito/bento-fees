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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { AppErrorResponseDto } from 'src/config/filter/app-error-response.dto';
import {
  BentoException,
  BentoExceptionType,
} from 'src/core/bento/exceptions/bento.exception';
import { AppInternalServerException } from 'src/exceptions/internal-server.exception';
import { AppUnauthorizedException } from 'src/exceptions/unauthorized.exception';
import { DeliveryFeesService } from '../../../../core/delivery-fees/delivery-fees.service';
import {
  CreateDeliveryFeeReqDto,
  CreateDeliveryFeeRespDto,
} from './dto/create-delivery-fee.dto';
import {
  FindDeliveryFeeRequestRespDto,
  OrderType,
  PaginateReqDto,
} from './dto/find-delivery-fee-request.dto';

import { Request as Req } from 'express';
import { User } from 'src/core/user/entities/user.entity';

@ApiBearerAuth()
@Controller()
@ApiResponse({
  status: 401,
  description: 'Unauthorized.',
  type: AppErrorResponseDto,
  example: {
    timestamp: '2025-03-18T08:48:11.831Z',
    detail: 'Token is required',
    code: 'UNAUTHORIZED_USER',
    message: 'Unauthorized user',
  },
})
@ApiResponse({ status: 403, description: 'Forbidden.' })
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
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: AppErrorResponseDto,
    example: {
      timestamp: '2025-03-18T10:43:09.934Z',
      detail: 'Validation failed',
      code: 'FIELDS_VALIDATION_ERROR',
      message: 'Please check the fields, some of them are invalid',
      fields: [
        {
          name: 'addressFrom.coordinates.lng',
          errors: {
            isNumber:
              'lng must be a number conforming to the specified constraints',
          },
        },
        {
          name: 'addressTo',
          errors: {
            isDefined: 'addressTo should not be null or undefined',
            isNotEmptyObject: 'addressTo must be a non-empty object',
          },
        },
        {
          name: 'merchant.id',
          errors: {
            isString: 'id must be a string',
            isNotEmpty: 'id should not be empty',
          },
        },
      ],
    },
  })
  async create(
    @Request() req: Req,
    @Headers('User-Agent') userAgent: string,
    @Body() createDeliveryFeeDto: CreateDeliveryFeeReqDto,
  ): Promise<CreateDeliveryFeeRespDto> {
    this.logger.log('Creating delivery fee');
    try {
      const user = req['user'] as User;
      const deliveryFeeRequest = await this.deliveryFeesService.create(
        createDeliveryFeeDto,
        user.token,
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
  @ApiOperation({
    summary: 'Find all delivery fee requests',
    description: 'Find all delivery fee requests',
  })
  @ApiQuery({
    name: 'order',
    enum: OrderType,
    default: OrderType.DESC,
    required: false,
    description: 'Order of the list',
  })
  @ApiQuery({ name: 'page', required: false, default: 1 })
  @ApiQuery({ name: 'limit', required: false, default: 10 })
  @ApiResponse({
    status: 200,
    description: 'The list of delivery fee requests.',
    type: [FindDeliveryFeeRequestRespDto],
  })
  async findAllRequests(
    @Request() req: Req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order')
    order: OrderType = OrderType.DESC,
  ): Promise<FindDeliveryFeeRequestRespDto[]> {
    this.logger.log('Finding all delivery fee requests');
    const paginate = new PaginateReqDto(page, limit, order);

    const [requests, total] = await this.deliveryFeesService.findAllRequests(
      req['user'] as User,
      paginate,
    );
    return requests.map((request) =>
      FindDeliveryFeeRequestRespDto.fromEntity(request),
    );
  }
}
