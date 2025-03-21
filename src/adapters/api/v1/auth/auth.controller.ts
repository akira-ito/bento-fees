import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppErrorResponseDto } from 'src/config/filter/app-error-response.dto';
import { BentoException } from 'src/core/bento/exceptions/bento.exception';
import { AppInternalServerException } from 'src/exceptions/internal-server.exception';
import { AppUnauthorizedException } from 'src/exceptions/unauthorized.exception';
import { Public } from '../../../../config/guard/guard-constant';
import { AuthService } from '../../../../core/auth/auth.service';
import { SignInReqDto, SignInRespDto } from './dto/sign-in.dto';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: 'Sign in',
    description: 'Sign in to the application',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
    type: SignInRespDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: AppErrorResponseDto,
    example: {
      timestamp: '2025-03-18T10:53:31.978Z',
      detail: 'Validation failed',
      code: 'FIELDS_VALIDATION_ERROR',
      message: 'Please check the fields, some of them are invalid',
      fields: [
        {
          name: 'username',
          errors: {
            isNotEmpty: 'username should not be empty',
            isString: 'username must be a string',
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: AppErrorResponseDto,
    example: {
      timestamp: '2025-03-18T10:55:22.257Z',
      detail: 'Unauthorized, invalid username or password',
      code: 'UNAUTHORIZED_USER',
      message: 'Unauthorized user',
    },
  })
  async signIn(@Body() signInDto: SignInReqDto): Promise<SignInRespDto> {
    try {
      return await this.authService.signIn(
        signInDto.username,
        signInDto.password,
      );
    } catch (error) {
      this.logger.error('Error signIn', error);

      if (error instanceof BentoException) {
        throw new AppUnauthorizedException(error.message, error);
      }
      throw new AppInternalServerException('An error occurred', error);
    }
  }
}
