import { ApiProperty } from '@nestjs/swagger';

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

export class CreateDeliveryFeeDto {
  @ApiProperty({
    description: 'Address from',
  })
  addressFrom: AddressFromDto;
  addressTo: AddressToDto;
  merchant: MerchantDto;
  user: UserDto;
}
