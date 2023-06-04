import * as Dotenv from 'dotenv';

Dotenv.config();

export const mailConstants = {
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
};
