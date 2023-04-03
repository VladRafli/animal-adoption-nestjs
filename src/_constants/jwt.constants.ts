import * as Dotenv from 'dotenv';

Dotenv.config();

const jwtConstants = {
  JwtSecret: process.env.JWT_SECRET,
  JwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};

export default jwtConstants;
