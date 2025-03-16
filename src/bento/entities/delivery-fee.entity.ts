export class DeliveryFee {
  fee: number;
  deliveryTime: number;
  distanceMeters: number;
  message: string | null;

  constructor(
    fee: number,
    deliveryTime: number,
    distanceMeters: number,
    message: string | null,
  ) {
    this.fee = fee;
    this.deliveryTime = deliveryTime;
    this.distanceMeters = distanceMeters;
    this.message = message;
  }
}
