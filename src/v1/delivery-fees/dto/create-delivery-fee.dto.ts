import { ApiProperty } from '@nestjs/swagger';

export class CoordinatesDto {
  lat: number;
  lng: number;
}

export class AddressDto {
  coordinates?: CoordinatesDto;
  coordinatesAdjustment?: CoordinatesDto;
}

export class MerchantDto {
  id: string;
}

export class UserDto {
  uuid: string;
}

export class CreateDeliveryFeeDto {
  @ApiProperty({
    description: 'Address from',
  })
  addressFrom: AddressDto;
  addressTo: AddressDto;
  merchant: MerchantDto;
  user: UserDto;
}
