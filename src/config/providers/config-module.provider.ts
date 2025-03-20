import { ConfigModule } from '@nestjs/config';
import configuration from '../configuration';

export const ConfigModuleProvider = ConfigModule.forRoot({
  cache: true,
  isGlobal: true,
  load: [configuration],
});
