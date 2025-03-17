import { Module } from '@nestjs/common';
import { BentoModule } from 'src/bento/bento.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [BentoModule],
})
export class AuthModule {}
