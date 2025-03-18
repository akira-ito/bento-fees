import { Column, Entity, Point } from 'typeorm';
import { BaseEntity } from './base.entity';

export class Coordinates {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

@Entity('delivery_fee_requests')
export class DeliveryFeeRequestEntity extends BaseEntity {
  @Column('numeric', { precision: 10, scale: 2 })
  originalFee: number;

  @Column('numeric', { precision: 10, scale: 2 })
  newFee: number;

  @Column('numeric', { precision: 20, scale: 2 })
  deliveryTime: number;

  @Column('numeric', { precision: 20, scale: 2 })
  distanceMeters: number;

  @Column('text', { nullable: true })
  message: string | null;

  @Column('geometry')
  addressFrom: Point;

  @Column('geometry')
  addressTo: Point;

  @Column('varchar', { length: 255 })
  userUuid: string;

  @Column('varchar', { length: 255 })
  merchantUuid: string;

  @Column('varchar', { length: 255 })
  userAgent: string;
}
