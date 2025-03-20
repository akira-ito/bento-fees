import { RetrieveDeliveryFeeRequest } from '../schemas/retrieve-delivery-fee.req';
import { RetrieveDeliveryFeeResponse } from '../schemas/retrieve-delivery-fee.response';
import { SignInResponse } from '../schemas/sign-in.response';

export interface BentoServicePort {
  retrieveDeliveryFee(
    deliveryFee: RetrieveDeliveryFeeRequest,
    bearerToken: string,
  ): Promise<RetrieveDeliveryFeeResponse>;

  signIn(username: string, password: string): Promise<SignInResponse>;
}

export const BentoServicePortProvider = Symbol('BentoServicePort');
