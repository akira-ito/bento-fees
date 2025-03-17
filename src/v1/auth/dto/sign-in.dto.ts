import { IsNotEmpty, IsString } from 'class-validator';

export class SignInReqDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInRespDto {
  access_token: string;
}
