export class Coordinates {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

export class Address {
  coordinates?: Coordinates;
  coordinatesAdjustment?: Coordinates;

  constructor(coordinates?: Coordinates, coordinatesAdjustment?: Coordinates) {
    this.coordinates = coordinates;
    this.coordinatesAdjustment = coordinatesAdjustment;
  }
}

export class Merchant {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class User {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export class DeliveryFee {
  addressFrom: Address;
  addressTo: Address;
  merchant: Merchant;
  user: User;

  constructor(
    addressFrom: Address,
    addressTo: Address,
    merchant: Merchant,
    user: User,
  ) {
    this.addressFrom = addressFrom;
    this.addressTo = addressTo;
    this.merchant = merchant;
    this.user = user;
  }
}
