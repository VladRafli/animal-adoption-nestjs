import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConstants from '@/_constants/jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
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
      ignoreExpiration: false,
      secretOrKey: jwtConstants.JwtSecret,
      signOptions: {
        expiresIn: '10m',
      },
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
