export class BentoException extends Error {
  type: BentoExceptionType;

  constructor(
    message: string,
    type: BentoExceptionType = BentoExceptionType.ERROR,
  ) {
    super(message);
    this.type = type;
    this.name = 'BentoException';
  }
}

export enum BentoExceptionType {
  UNAUTHORIZED = 'Unauthorized',
  ERROR = 'ErrorDeliveryFee',
}
