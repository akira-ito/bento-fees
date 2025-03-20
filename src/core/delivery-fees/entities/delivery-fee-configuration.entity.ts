import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum DeliveryFeeConfigurationType {
  MARGIN_FEE = 'MARGIN_FEE',
}

@Entity('delivery_fee_configurations')
export class DeliveryFeeConfigurationEntity extends BaseEntity {
  @Column('varchar', { length: 255, unique: true })
  type: DeliveryFeeConfigurationType;

  @Column('numeric', { precision: 10, scale: 2 })
  value: number;
}
