import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConstants from 'src/_constants/jwt.constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() ||
        ExtractJwt.fromExtractors([
          (request: Request) => {
            const data = request?.cookies.refresh_token;
            if (!data) {
              return null;
            }
            return data;
          },
        ]),
      secretOrKey: jwtConstants.JwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken =
      req.header('Authorization') !== undefined
        ? req.header('Authorization').replace('Bearer', '').trim()
        : req.cookies.refresh_token;
    return { ...payload, refreshToken };
  }
}
