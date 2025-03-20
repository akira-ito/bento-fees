import { Coordinates } from 'src/core/delivery-fees/entities/delivery-fee-request.entity';

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
