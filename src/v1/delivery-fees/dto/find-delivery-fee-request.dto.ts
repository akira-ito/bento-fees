import { ApiProperty } from '@nestjs/swagger';
import { DeliveryFeeRequestEntity } from '../entities/delivery-fee-request.entity';

export class PaginateReqDto {
  @ApiProperty({
    description: 'The current page',
    example: 1,
  })
  public page: number;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
  })
  public limit: number;

  @ApiProperty({
    description: 'The total number of items',
    example: 100,
  })
  public total: number;

  @ApiProperty({
    description: 'The order of the items',
    example: 'ASC',
  })
  public order: OrderType;

  constructor(page: number, limit: number, order: OrderType) {
    this.page = page;
    this.limit = limit;
    // this.total = total;
    this.order = order;
  }
}

export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindDeliveryFeeRequestRespDto {
  @ApiProperty({
    description: 'The original delivery fee',
    example: 500,
  })
  public originalFee: number;

  @ApiProperty({
    description: 'The new delivery fee after adjustments',
    example: 450,
  })
  public newFee: number;

  @ApiProperty({
    description: 'The delivery time in minutes',
    example: 30,
  })
  public deliveryTime: number;

  @ApiProperty({
    description: 'The distance in meters',
    example: 1500,
  })
  public distanceMeters: number;

  @ApiProperty({
    description: 'An optional message regarding the fee',
    example: 'Delivery fee adjusted due to traffic conditions',
    nullable: true,
  })
  public message: string | null;

  @ApiProperty({
    description: 'The timestamp of the request',
    example: '2023-10-05T14:48:00.000Z',
  })
  public timestamp: Date;

  @ApiProperty({
    description: 'The user agent of the requester',
    example:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  })
  public userAgent: string;

  constructor(
    originalFee: number,
    newFee: number,
    deliveryTime: number,
    distanceMeters: number,
    message: string | null,
    timestamp: Date,
    userAgent: string,
  ) {
    this.originalFee = originalFee;
    this.newFee = newFee;
    this.deliveryTime = deliveryTime;
    this.distanceMeters = distanceMeters;
    this.message = message;
    this.timestamp = timestamp;
    this.userAgent = userAgent;
  }

  static fromEntity(
    entity: DeliveryFeeRequestEntity,
  ): FindDeliveryFeeRequestRespDto {
    return new FindDeliveryFeeRequestRespDto(
      entity.originalFee,
      entity.newFee,
      entity.deliveryTime,
      entity.distanceMeters,
      entity.message,
      entity.createdAt,
      entity.userAgent,
    );
  }
}
