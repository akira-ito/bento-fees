import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import configuration from './configuration';
config();

const configService = configuration();
const databaseConfig = configService.database;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
