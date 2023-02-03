//External Lib  import
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });
export const APPLICATION_NAME = process.env.APPLICATION_NAME || '';
export const ENVIRONMENT = process.env.APP_ENV || 'dev';
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_TEST = ENVIRONMENT === 'test';
export const APP_PORT = Number(process.env.APP_PORT) || 8080;
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/api/v1';
export const JWT_SECRET = process.env.JWT_SECRET || 'thisisasamplesecret';
export const JWT_ACCESS_EXPIRATION_MINUTES =
  process.env.JWT_ACCESS_EXPIRATION_MINUTES || 60;
export const JWT_REFRESH_EXPIRATION_DAYS =
  process.env.JWT_REFRESH_EXPIRATION_DAYS || 60;
export const JWT_RESET_PASSWORD_EXPIRATION_MINUTES =
  process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES || 15;
export const JWT_VERIFY_EMAIL_EXPIRATION_MINUTES =
  process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES || 15;
export const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PWD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT) || 27017,
};

export const email = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: 25,
    secure: false,
    auth: {
      user: process.env.SMTP_AUTH_USERNAME,
      pass: process.env.SMTP_AUTH_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  from: process.env.EMAIL_FROM,
};

export const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/foo';
export const FORGET_VERIFY_URI = process.env.FORGET_VERIFY_URI;
