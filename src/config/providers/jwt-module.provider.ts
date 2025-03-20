import { JwtModule } from '@nestjs/jwt';

export const JwtModuleProvider = JwtModule.register({
  global: true,
  signOptions: { expiresIn: '60s' },
});
