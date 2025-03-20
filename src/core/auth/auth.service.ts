import { Inject, Injectable } from '@nestjs/common';
import {
  BentoServicePort,
  BentoServicePortProvider,
} from '../bento/ports/bento.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(BentoServicePortProvider) private bentoService: BentoServicePort,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const signInResponse = await this.bentoService.signIn(username, pass);

    return {
      access_token: signInResponse.idToken,
    };
  }
}
