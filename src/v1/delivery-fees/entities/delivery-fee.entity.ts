import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Coordinates {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

@Entity('delivery_fee_requests')
export class DeliveryFeeRequestsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;

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
