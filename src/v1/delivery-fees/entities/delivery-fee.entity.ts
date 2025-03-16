export class Coordinates {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

export interface DeliveryFee {
  originalFee: number;
  newFee: number;
  deliveryTime: number;
  distanceMeters: number;
  message: string | null;
}
