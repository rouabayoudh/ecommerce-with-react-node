import * as dotenv from 'dotenv';

import { Config } from './types';
dotenv.config();

export const config: Config = {
  env: process.env.NODE_ENV || 'development',
  i18n: {
    fallbackLanguage: 'en',
  },
  security: {
    cors: {
      allRoutes: true,
      headers: 'content-type,x-xsrf-token,x-csrf-token',
      methods: ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS', 'HEAD'],
      allowOrigins: ['http://localhost:3000', '*'],
      allowCredentials: true,
    },
  },
  jwt: {
    //Todo: to use in jwt strategy @chadha-grami
    accessSecret: process.env.JWT_SECRET || 'secret',
    refreshSecret: process.env.REFRESH_SECRET || 'secret',
    accessTokenExpiresIn: '30m',
    refreshTokenExpiresIn: '1d',
    algorithm: 'HS256',
  },
  pagination: {
    limit: 10,
  },
  mongo: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    //you can make a .env file in the api and use an env varibale MONGO_URI wher u can put the mongo uri
    uri: process.env.MONGO_URI || 'mongodb://admin:0000@mongodb:27017/',
    dbName: process.env.MONGO_DB || 'e-jei',
  },
  mail: {
    transport: {
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      secure: Boolean(process.env.MAIL_SECURITY) || true,
      auth: {
        //TODO: change the email and password to the ones of the company!!!!!!
        user: process.env.MAIL_USER || 'exp@gmail.com', //put your email
        pass: process.env.MAIL_PASS || '', //put your password
      },
      port: Number(process.env.MAIL_PORT) || 465,
    },
    defaults: {
      from: 'support@example.com',
    },
  },
  mailTemplate: {
    dir: __dirname + '/../mailer/templates',
  },
  attachment: {
    maxFileNameLength: 255,
    maxFileSize: 5 * 1024 * 1024,
  },
};
