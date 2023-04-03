import * as Dotenv from 'dotenv';

Dotenv.config();

const cookieParserConstants = {
  CookieSecret: process.env.COOKIE_SECRET,
};

export default cookieParserConstants;
