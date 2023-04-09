import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import * as uuid from 'uuid';
import jwtConstants from '@/_constants/jwt.constants';
import { PrismaService } from '@/_provider/prisma/prisma.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { ReadLoginDto } from './dto/read-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user || Bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login({ email, password }: ReadLoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user || !Bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      issuer: 'adoptme.my.id',
      secret: jwtConstants.JwtSecret,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      issuer: 'adoptme.my.id',
      secret: jwtConstants.JwtRefreshSecret,
    });

    await this.prismaService.refreshToken.upsert({
      create: {
        id: user.id,
        token: Bcrypt.hashSync(refreshToken, Bcrypt.genSaltSync()),
        expiredAt: dayjs().add(7, 'day').format(),
      },
      update: {
        token: Bcrypt.hashSync(refreshToken, Bcrypt.genSaltSync()),
        expiredAt: dayjs().add(7, 'day').format(),
      },
      where: {
        id: user.id,
      },
    });

    return {
      accessToken,
      refreshToken,
      role: user.role,
    };
  }

  async register(user: CreateRegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      return null;
    }

    user.password = await Bcrypt.hash(user.password, Bcrypt.genSaltSync());
    return await this.prismaService.user.create({
      data: {
        id: uuid.v4(),
        ...user,
      },
    });
  }

  async generateAccessToken(userId: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    const storedRefreshToken = await this.prismaService.refreshToken.findUnique(
      {
        where: {
          id: userId,
        },
      },
    );

    const test = await Bcrypt.compare(refreshToken, storedRefreshToken.token);

    if (
      !storedRefreshToken ||
      !(await Bcrypt.compare(refreshToken, storedRefreshToken.token))
    )
      return null;

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const newAccessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      issuer: 'adoptme.my.id',
      secret: jwtConstants.JwtSecret,
    });

    const newRefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      issuer: 'adoptme.my.id',
      secret: jwtConstants.JwtRefreshSecret,
    });

    await this.prismaService.refreshToken.update({
      data: {
        token: Bcrypt.hashSync(newRefreshToken, Bcrypt.genSaltSync()),
        expiredAt: dayjs().add(7, 'day').format(),
      },
      where: {
        id: user.id,
      },
    });

    return {
      newAccessToken,
      newRefreshToken,
    };
  }
}
