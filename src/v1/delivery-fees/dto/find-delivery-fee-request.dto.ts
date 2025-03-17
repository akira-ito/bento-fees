import { DeliveryFeeRequestEntity } from '../entities/delivery-fee-request.entity';

export class FindDeliveryFeeRequestRespDto {
  constructor(
    public originalFee: number,
    public newFee: number,
    public deliveryTime: number,
    public distanceMeters: number,
    public message: string | null,
    public timestamp: Date,
    public userAgent: string,
  ) {}

  static fromEntity(
    entity: DeliveryFeeRequestEntity,
  ): FindDeliveryFeeRequestRespDto {
    return new FindDeliveryFeeRequestRespDto(
      entity.originalFee,
      entity.newFee,
      entity.deliveryTime,
      entity.distanceMeters,
      entity.message,
      entity.createdAt,
      entity.userAgent,
    );
  }
}
