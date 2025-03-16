export interface BentoConfig {
  host: string;
  timeout: number;
}

export interface AppConfiguration {
  port: number;
  bentoIntegration: BentoConfig;
}

export default () => {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    bentoIntegration: {
      host: process.env.BENTO_HOST,
      timeout: parseInt(process.env.BENTO_HTTP_TIMEOUT || '5000', 10),
    },
  } as AppConfiguration;
};
