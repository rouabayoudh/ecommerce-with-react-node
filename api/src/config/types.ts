export type Config = {
  env: string;
  security: {
    cors: {
      allRoutes: boolean;
      headers: string;
      methods: string[];
      allowOrigins: string[];
      allowCredentials: boolean;
    };
  };
  i18n: {
    fallbackLanguage: string;
  };
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    accessTokenExpiresIn: string;
    refreshTokenExpiresIn: string;
    algorithm: string;
  };
  pagination: {
    limit: number;
  };
  mongo: {
    uri: string;
    dbName: string;
    user: string;
    password: string;
  };
  mail: {
    transport: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
    defaults: {
      from: string;
    };
  };
  mailTemplate: {
    dir: string;
  };
  attachment: {
    maxFileNameLength: number;
    maxFileSize: number;
  };
};
