export interface BentoConfig {
  host: string;
  timeout: number;
  identityProviderHost: string;
  identityProviderApiKey: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface AppConfiguration {
  port: number;
  bentoIntegration: BentoConfig;
  database: DatabaseConfig;
}

export default () => {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    bentoIntegration: {
      host: process.env.BENTO_HOST,
      timeout: parseInt(process.env.BENTO_HTTP_TIMEOUT || '5000', 10),
      identityProviderHost: process.env.BENTO_IDENTITY_HOST,
      identityProviderApiKey: process.env.BENTO_IDENTITY_API_KEY,
    },
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
  } as AppConfiguration;
};
