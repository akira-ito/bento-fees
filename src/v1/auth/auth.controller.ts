import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { BentoException } from 'src/bento/exceptions/bento.exception';
import { AppException } from '../exceptions/exception';
import { AppAnauthorizedException } from '../exceptions/unauthorized.exception';
import { AuthService } from './auth.service';
import { Public } from './constant';
import { SignInReqDto, SignInRespDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInReqDto): Promise<SignInRespDto> {
    try {
      return await this.authService.signIn(
        signInDto.username,
        signInDto.password,
      );
    } catch (error) {
      this.logger.error('Error signIn', error);

      if (error instanceof BentoException) {
        throw new AppAnauthorizedException(error.message, error);
      }
      throw new AppException('An error occurred', error);
    }
  }
}
