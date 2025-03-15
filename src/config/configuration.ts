export interface BentoConfig {
  host: string;
}

export interface AppConfiguration {
  port: number;
  bentoIntegration: BentoConfig;
}

export default () =>
  ({
    port: parseInt(process.env.PORT, 10) || 3000,
    bentoIntegration: {
      host: process.env.BENTO_HOST,
    },
  }) as AppConfiguration;
