import { Module } from '@nestjs/common';
import { BentoModule } from 'src/adapters/bento/bento.module';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [BentoModule],
})
export class AuthModule {}
