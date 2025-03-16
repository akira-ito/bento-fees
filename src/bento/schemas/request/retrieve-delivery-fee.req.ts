import { Coordinates } from 'src/v1/delivery-fees/entities/delivery-fee.entity';

export class RetrieveDeliveryFeeRequest {
  addressFrom: {
    coordinates: Coordinates;
  };
  addressTo: {
    coordinatesAdjustment: Coordinates;
  };
  merchant: {
    id: string;
  };
  user: {
    uuid: string;
  };
}
