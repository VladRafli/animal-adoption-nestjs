import * as Dotenv from 'dotenv';

Dotenv.config();

const expressSessionConstants = {
  CookieSecret: process.env.COOKIE_SECRET,
};

export default expressSessionConstants;
