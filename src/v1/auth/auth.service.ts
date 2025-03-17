import { Injectable } from '@nestjs/common';
import { BentoService } from 'src/bento/bento.service';

@Injectable()
export class AuthService {
  constructor(private bentoService: BentoService) {}

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
