import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DecimalTransformer } from 'src/transformer/decimal.transformer';
import { DeliveryFeeRequestEntity } from '../entities/delivery-fee-request.entity';

export class CoordinatesDto {
  lat: number;
  lng: number;
}

export class AddressFromDto {
  coordinates: CoordinatesDto;
}

export class AddressToDto {
  coordinatesAdjustment: CoordinatesDto;
}

export class MerchantDto {
  id: string;
}

export class UserDto {
  uuid: string;
}

// Request DTO and Response DTO
export class CreateDeliveryFeeReqDto {
  @ApiProperty({
    description: 'Address from',
    example: {
      coordinates: {
        lat: 40.712776,
        lng: -74.005974,
      },
    },
  })
  addressFrom: AddressFromDto;

  @ApiProperty({
    description: 'Address to',
    example: {
      coordinatesAdjustment: {
        lat: 34.052235,
        lng: -118.243683,
      },
    },
  })
  addressTo: AddressToDto;

  @ApiProperty({
    description: 'Merchant information',
    example: {
      id: 'merchant123',
    },
  })
  merchant: MerchantDto;

  @ApiProperty({
    description: 'User information',
    example: {
      uuid: 'user-uuid-456',
    },
  })
  user: UserDto;
}

export class CreateDeliveryFeeRespDto {
  @ApiProperty({
    description: 'Original delivery fee',
    example: 1000,
  })
  @Transform(DecimalTransformer())
  originalFee: number;

  @ApiProperty({
    description: 'New delivery fee after adjustments',
    example: 800,
  })
  @Transform(DecimalTransformer())
  newFee: number;

  @ApiProperty({
    description: 'Estimated delivery time in minutes',
    example: 45,
  })
  @Transform(DecimalTransformer())
  deliveryTime: number;

  @ApiProperty({
    description: 'Distance in meters between the origin and destination',
    example: 12000,
  })
  @Transform(DecimalTransformer())
  distanceMeters: number;

  @ApiProperty({
    description: 'Additional message or information',
    example: 'Delivery fee adjusted due to traffic conditions',
    nullable: true,
  })
  message: string | null;

  public constructor(
    originalFee: number,
    newFee: number,
    deliveryTime: number,
    distanceMeters: number,
    message: string | null,
  ) {
    this.originalFee = originalFee;
    this.newFee = newFee;
    this.deliveryTime = deliveryTime;
    this.distanceMeters = distanceMeters;
    this.message = message;
  }

  public static fromRequestEntity(
    entity: DeliveryFeeRequestEntity,
  ): CreateDeliveryFeeRespDto {
    return new CreateDeliveryFeeRespDto(
      entity.originalFee,
      entity.newFee,
      entity.deliveryTime,
      entity.distanceMeters,
      entity.message,
    );
  }
}
