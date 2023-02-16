import * as Dotenv from 'dotenv';

Dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
